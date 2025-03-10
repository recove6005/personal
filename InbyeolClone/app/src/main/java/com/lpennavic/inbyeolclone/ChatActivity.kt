package com.lpennavic.inbyeolclone

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.RelativeLayout
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.databinding.DataBindingUtil
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.lpennavic.inbyeolclone.databinding.ActivityChatBinding
import com.lpennavic.inbyeolclone.databinding.ListitemChatBinding
import com.lpennavic.inbyeolclone.model.ChatModel
import net.yslibrary.android.keyboardvisibilityevent.KeyboardVisibilityEvent
import net.yslibrary.android.keyboardvisibilityevent.KeyboardVisibilityEventListener


class ChatActivity : AppCompatActivity() {
    lateinit var docId: String
    lateinit var binding: ActivityChatBinding
    lateinit var auth: FirebaseAuth
    lateinit var firestore: FirebaseFirestore
    var datas = mutableListOf<ChatModel>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_chat)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        auth = FirebaseAuth.getInstance()
        firestore = FirebaseFirestore.getInstance()
        binding = DataBindingUtil.setContentView(this, R.layout.activity_chat)
        docId = intent.getStringExtra("doc_id").toString()

        val adapter = ChatAdapter()
        binding.chatBox.adapter = adapter
        binding.chatBox.layoutManager = LinearLayoutManager(this)

        binding.sendBtn.setOnClickListener {
            val chatString = binding.inputBox.text.toString()
            val order = System.currentTimeMillis().toString()

            var chatModel = ChatModel(auth.currentUser?.email.toString(), chatString, docId, order)
            firestore.collection("chat").add(chatModel)
            adapter.notifyDataSetChanged()
            binding.inputBox.setText("")

        }

        // 키보드 - 에딧텍스트 위치 조정 - 태블릿 기준
        KeyboardVisibilityEvent.setEventListener(this, object : KeyboardVisibilityEventListener {
            override fun onVisibilityChanged(isOpen: Boolean) {
                val params = binding.inputBox.layoutParams as LinearLayout.LayoutParams
                params.bottomMargin = if (isOpen) {
                    // 키보드가 열릴 때
                    resources.getDimension(R.dimen.soft_keyboard_height).toInt()
                } else {
                    // 키보드가 닫힐 때
                    0
                }
                binding.inputBox.layoutParams = params
            }
        })
    }

    inner class ChatHolder(var binding:ListitemChatBinding): RecyclerView.ViewHolder(binding.root)
    inner class ChatAdapter: RecyclerView.Adapter<ChatHolder>() {
        init {
            firestore.collection("chat").whereEqualTo("docId", docId).addSnapshotListener { value, error ->
                datas.clear()
                if(value != null) {
                    for(doc in value) {
                        val chatModel = doc.toObject(ChatModel::class.java)
                        datas.add(chatModel)
                    }
                    datas.sortBy { it.order }
                }
                notifyDataSetChanged()
            }
        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ChatHolder {
            val view = ListitemChatBinding.inflate(LayoutInflater.from(parent.context), parent, false)
            return ChatHolder(view)
        }

        override fun getItemCount(): Int {
            return datas.size
        }

        override fun onBindViewHolder(holder: ChatHolder, position: Int) {
            holder.binding.userId.text = datas[position].id
            holder.binding.content.text = datas[position].content
        }
    }
}
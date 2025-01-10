package com.recove6005.photobook.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import androidx.recyclerview.widget.RecyclerView
import com.recove6005.photobook.R
import java.io.File

class PagehomeViewpagerAdapter(
    private var photoList: List<List<File>>,
    private var description: List<String>
) : RecyclerView.Adapter<PagehomeViewpagerAdapter.ViewHolder> () {

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val itemPageRecyclerView: RecyclerView = itemView.findViewById(R.id.item_page_recyclerview)
        val itemPageDescription: EditText = itemView.findViewById(R.id.item_page_description)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_page, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.itemPageDescription.setText(description[position])

    }

    override fun getItemCount(): Int {
        return photoList.size
    }
}
package com.recove6005.photobook

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import com.recove6005.photobook.databinding.ActivityPagehomeBinding

class PagehomeActivity: AppCompatActivity() {
    lateinit var binding: ActivityPagehomeBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_pagehome)



    }
}
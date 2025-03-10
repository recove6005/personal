package com.lpennavic.inbyeolclone.Fragment

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.lpennavic.inbyeolclone.R
import com.lpennavic.inbyeolclone.databinding.FragmentAlarmBinding

class AlarmFragment: Fragment() {
    lateinit var binding: FragmentAlarmBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_alarm, container, false)


        return binding.root
    }

}
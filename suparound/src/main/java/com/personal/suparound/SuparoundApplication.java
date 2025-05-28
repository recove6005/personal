package com.personal.suparound;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class SuparoundApplication {
	public static void main(String[] args) {
		SpringApplication.run(SuparoundApplication.class, args);
	}
}


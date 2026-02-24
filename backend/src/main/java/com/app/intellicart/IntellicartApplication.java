package com.app.intellicart;

import com.app.intellicart.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(JwtProperties.class)
@SpringBootApplication
public class IntellicartApplication {

	public static void main(String[] args) {

		SpringApplication.run(IntellicartApplication.class, args);
	}

}

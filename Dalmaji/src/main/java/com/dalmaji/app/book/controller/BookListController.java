package com.dalmaji.app.book.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dalmaji.app.book.service.BookService;
import com.dalmaji.app.book.vo.BookVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("search")
@CrossOrigin("*")
@RequiredArgsConstructor
public class BookListController {
	
	private final BookService service;
	
	//�����ȸ(no,����,����,����ó,����⵵,��������)
	@GetMapping("list")
	public List<BookVo>list(){
		return service.list();
	}
	
	//�˻�(���� or ���� or ���ǻ�)
	@GetMapping("detail")
	public String detail(BookVo vo, Model model) {
		BookVo bookVo = service.detail(vo);
		model.addAttribute("bookVo",bookVo);
		return "board/detail";
		
	}
	
	
	//�Խñ� ����(����,����,�̹���)
	@PostMapping("admin/edit")
	public String edit(BookVo vo) throws Exception {
		int result = service.edit(vo);
		if(result != 1) {
			throw new Exception();
		}
		return "redirect:/book/admin/detail?no=" + vo.getBookNo();
	}
	
	//�Խñ� ����(�����ڸ�)
	@GetMapping("admin/delete")
	public String delete(BookVo vo) throws Exception {
		int result = service.delete(vo);
		if(result != 1) {
			throw new Exception();
		}
		return "redirect:/book/admin/list";
	}
	

}

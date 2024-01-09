package com.dalmaji.app.notice.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dalmaji.app.notice.service.NoticeService;
import com.dalmaji.app.notice.vo.NoticeVo;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("admin/notice")
@RequiredArgsConstructor
public class AdminNoticeController {
	
	private final NoticeService service;
	
	//공지사항 작성
	@PostMapping("admin/insert")
	public String insert(NoticeVo vo) throws Exception {
		
		int result = service.insert(vo);
		
		if(result != 1) {
			throw new Exception();
		}
		
		return "redirect:/admin/notice/list";
	}
	
	//공지사항 목록조회 (data+view)
	@GetMapping("admin/list")
	public String list(Model model) {
		
		List<NoticeVo> voList = service.list();
		model.addAttribute("noticeVoList" , voList);
		
		return "admin/notice/list";
	}
	
	//공지사항 목록조회 (data)
	@GetMapping
	@ResponseBody
	public List<NoticeVo> restList(){
		List<NoticeVo> voList = service.list();
		return voList;
	}
	
	//공지사항 상세조회
	@GetMapping("admin/detail")
	public String detail(NoticeVo vo, Model model) {
		NoticeVo noticeVo = service.detail(vo);
		model.addAttribute("noticeVo", noticeVo);
		return "admin/notice/adminetail";
	}
	
	//공지사항 삭제 (번호)
	@GetMapping("admin/delete")
	public String delete(NoticeVo vo) throws Exception {
		int result = service.delete(vo);
		if(result != 1) {
			throw new Exception();
		}
		return "redirect:/admin/notice/adminlist";
	}
	
	//공지사항 수정 (제목, 내용)
	@PostMapping("admin/edit")
	public String edit(NoticeVo vo) throws Exception {
		int result = service.edit(vo);
		if(result != 1) {
			throw new Exception();
		}
		return "redirect:/notice/detail?no=" + vo.getNo();
	}

}

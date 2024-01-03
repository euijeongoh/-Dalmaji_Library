package com.dalmaji.app.book.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.dalmaji.app.book.dao.BookDao;
import com.dalmaji.app.book.vo.BookVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {
	
	private final BookDao dao;
	private final SqlSessionTemplate sst;
	

	// �����ȸ
	public List<BookVo> list() {
		return dao.list(sst);
	}

	//�˻�
	public BookVo detail(BookVo vo) {
		return dao.detail(sst,vo);
	}

	//����
	public int edit(BookVo vo) {
		return dao.edit(sst,vo);
	}

	//����
	public int delete(BookVo vo) {
		return dao.delete(sst,vo);
	}

}

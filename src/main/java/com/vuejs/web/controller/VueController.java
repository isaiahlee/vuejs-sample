package com.vuejs.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Slf4j
@Controller
@RequestMapping("/vue")
public class VueController {

  @RequestMapping(value = "", method = RequestMethod.GET)
  public String vue(HttpServletRequest request, HttpServletResponse response)
    throws Exception {

    request.setAttribute("categoryId", "vue");

    return "/vue/vindex";
  }

  @RequestMapping(value = "/sub", method = RequestMethod.GET)
  public String vueSub(HttpServletRequest request, HttpServletResponse response)
    throws Exception {

    request.setAttribute("categoryId", "vueSub");

    return "/vue/sub/vindex";
  }
}

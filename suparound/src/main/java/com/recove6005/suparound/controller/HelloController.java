package com.recove6005.suparound.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.xml.parsers.ParserConfigurationException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.xml.sax.SAXException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.recove6005.suparound.service.BoxOfficeService;
import com.recove6005.suparound.service.PuppyfoodService;
import com.recove6005.suparound.service.SunsetsService;

@Controller
public class HelloController {
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("name", "SupAround");
        return "home";
    }

    @GetMapping("/boxoffice")
    public String boxoffice(Model model) {
        BoxOfficeService boxOfficeService = new BoxOfficeService();
        ArrayList<String> rankList = boxOfficeService.getDailyBoxOfficeTitleList();
        ArrayList<String> accList = boxOfficeService.getDailyBoxOfficeAudiaccList();
        ArrayList<String> cdList = boxOfficeService.getDailyBoxOfficeCodeList();
        
        model.addAttribute("rankList", rankList);
        model.addAttribute("accList", accList);
        model.addAttribute("cdList", cdList);
        
        return "boxoffice";
    }
    
    @GetMapping("/boxoffice/{cd}")
    public String boxofficeDetail(@PathVariable("cd") String cd, Model model) {
    	model.addAttribute("cd", cd);
    	
    	return "movie";
    }

    @GetMapping("/sunsets")
    public String sunsets(Model model) throws IOException, SAXException, ParserConfigurationException {
        SunsetsService sunsetsService = new SunsetsService();
        String result = sunsetsService.getSunsets();

        // xml -> json
        XmlMapper mapper = new XmlMapper();
        JsonNode node = mapper.readTree(result);
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(node);

        JsonNode item = node.path("body").path("items").path("item");
        JsonNode location = item.path("location");
        JsonNode sunset = item.path("sunset");
        JsonNode sunrise = item.path("sunrise");
        JsonNode moonrise = item.path("moonrise");
        JsonNode moonset = item.path("moonset");
        JsonNode latitude = item.path("latitudeNum");
        JsonNode longitude = item.path("longitudeNum");

        model.addAttribute("location", location);
        model.addAttribute("sunrise", new StringBuilder(sunrise.toString()).insert(3, '시').insert(6, '분'));
        model.addAttribute("sunset", new StringBuilder(sunset.toString()).insert(3, '시').insert(6, '분'));
        model.addAttribute("moonrise", new StringBuilder(moonrise.toString()).insert(3, '시').insert(6, '분'));
        model.addAttribute("moonset", new StringBuilder(moonset.toString()).insert(3, '시').insert(6, '분'));
        model.addAttribute("latitude", latitude);
        model.addAttribute("longitude", longitude);
        // DoomParser로 파싱값 가져오기
        // DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        // DocumentBuilder builde = factory.newDocumentBuilder();
        // Document doc = builde.parse(new ByteArrayInputStream(json.getBytes()));
        // 태그값 가져오기
        // String location = doc.getElementsByTagName("location").item(0).getTextContent();
        // String sunrise = doc.getElementsByTagName("sunrise").item(0).getTextContent();
        // String sunset = doc.getElementsByTagName("sunset").item(0).getTextContent();
        // String moonrise = doc.getElementsByTagName("moonrise").item(0).getTextContent();
        // String moonset = doc.getElementsByTagName("moonset").item(0).getTextContent();
        // model.addAttribute("location", location);
        // model.addAttribute("sunrise", sunrise);
        // model.addAttribute("sunset", sunset);
        // model.addAttribute("moonrise", moonrise);
        // model.addAttribute("moonset", moonset);
        return "sunsets";
    }

    @GetMapping("/puppyfood")
    public String puppyfood(Model model) {
        PuppyfoodService service = new PuppyfoodService();
        String result = service.getPuppyfood();

        model.addAttribute("result", result);

        return "puppyfood";
    }

}

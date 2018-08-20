package com.hexacore.athego.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;
import kr.co.shineware.nlp.komoran.model.Token;
import kr.co.shineware.util.common.model.Pair;

public class MorphologicalAnalysisUtil {

	public static Map<String, Integer> generateWordCount(String str) {
		
		Komoran komoran = new Komoran(DEFAULT_MODEL.FULL);
		
		String input = "볼껄 그랬네욬ㅋㅋ 딴짓한다고 못봤더니.. 어찌된건지 모르겠네요.";
		KomoranResult analyzeResultList = komoran.analyze(str);
		
		Map<String, Integer> map = new HashMap<>();
		List<Pair<String, String>> strList = analyzeResultList.getList();
		for (Pair<String, String> pair : strList) {
			
			if (!map.containsKey(pair.getFirst())) {  // first time we've seen this string
			      map.put(pair.getFirst(), 1);
			    }
			    else {
			      int count = map.get(pair.getFirst());
			      map.put(pair.getFirst(), count + 1);
			    }
		} 
		//List<Token> tokenList = analyzeResultList.getTokenList();
		
//		for (Token token : tokenList) {
//			System.out.println(token);
//			System.out.println(token.getMorph()+"/"+token.getPos()+"("+token.getBeginIndex()+","+token.getEndIndex()+")");
//			System.out.println();
//		}
		
		//print nouns
		System.out.println("==========print nouns==========");
		
		//이게 명사 리스트(즉, 태그)
		List<String> nouns = analyzeResultList.getNouns();
		System.out.println(nouns);
		
		Map<String, Integer> result = new HashMap<>();
		
		for (String noun : nouns) {
			result.put(noun, map.get(noun));
		}
		return result;
	}
}

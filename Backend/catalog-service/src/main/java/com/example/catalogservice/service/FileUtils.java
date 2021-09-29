package com.example.catalogservice.service;

import com.example.catalogservice.dto.CatalogDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Slf4j
@Component
public class FileUtils {

    @Value("${resource.location}")
    private String resourceLocation;

    public CatalogDto parseFileInfo(CatalogDto catalogDto, List<MultipartFile> files) throws IOException{
        //file
        if(!files.isEmpty()) {

            // 파일 이름을 업로드 한 날짜로 바꾸어서 저장할 것이다
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String current_date = simpleDateFormat.format(new Date());

            // 프로젝트 폴더에 저장하기 위해 절대경로를 설정 (Window 의 Tomcat 은 Temp 파일을 이용한다)
            String absolutePath = resourceLocation;

            // 경로를 지정하고 그곳에다가 저장할 심산이다
            String path = File.separator + current_date;
            File file = new File(absolutePath + path);
            // 저장할 위치의 디렉토리가 존지하지 않을 경우
            if (!file.exists()) {
                // mkdir() 함수와 다른 점은 상위 디렉토리가 존재하지 않을 때 그것까지 생성
                file.mkdirs();
            }

            MultipartFile firstFile = files.get(0);
            // 파일이 비어 있지 않을 때 작업을 시작해야 오류가 나지 않는다
            if (!firstFile.isEmpty()) {
                // jpeg, png, gif 파일들만 받아서 처리할 예정
                String contentType = files.get(0).getContentType();
                String originalFileExtension = "";
                // 확장자 명이 없으면 이 파일은 잘 못 된 것이다
                if (ObjectUtils.isEmpty(contentType)) {
                    log.info("파일 콘텐츠 타입 에러");
                    return null;
                } else {
                    if (contentType.contains("image/jpeg")) {
                        originalFileExtension = ".jpg";
                    } else if (contentType.contains("image/png")) {
                        originalFileExtension = ".png";
                    } else if (contentType.contains("image/gif")) {
                        originalFileExtension = ".gif";
                    }
                    // 다른 파일 명이면 아무 일 하지 않는다
                    else {
                        log.info("파일확장명 에러");
                        return null;
                    }
                }
                // 각 이름은 겹치면 안되므로 나노 초까지 동원하여 지정
                String new_file_name = Long.toString(System.nanoTime()) + originalFileExtension;

                catalogDto.setOriginalFileName(firstFile.getOriginalFilename());
                catalogDto.setStoredFilePath(path + File.separator + new_file_name);
                catalogDto.setFileSize(firstFile.getSize());

                log.info(absolutePath + path + "/");

                // 저장된 파일로 변경하여 이를 보여주기 위함
                file = new File(absolutePath + path + File.separator + new_file_name);
                firstFile.transferTo(file);

                return catalogDto;
            }
        }
        //end file

        return null;
    }
}

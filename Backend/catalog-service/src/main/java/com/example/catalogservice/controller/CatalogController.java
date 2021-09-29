package com.example.catalogservice.controller;

import com.example.catalogservice.dto.CatalogDto;
import com.example.catalogservice.entity.CatalogEntity;
import com.example.catalogservice.jpa.CatalogRepository;
import com.example.catalogservice.service.CatalogService;
import com.example.catalogservice.service.FileUtils;
import com.example.catalogservice.vo.RequestCatalog;
import com.example.catalogservice.vo.RequestSearch;
import com.example.catalogservice.vo.ResponseCatalog;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.ws.rs.Path;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/")
@Slf4j
public class CatalogController {
    private final Environment env;
    private final CatalogService catalogService;
    private final CatalogRepository catalogRepository;
    private final FileUtils fileUtils;

    @Value("${resource.location}")
    private String resourceLocation;

    //todo 카테고리 변경하기
    private final String CATEGORY = "category";
    private final String KEYWORD = "keyword";
    private final String ID = "id";
    private final String DATE = "date";

    @GetMapping(value="/image/{dateDir}/{fileName}}", produces= MediaType.IMAGE_PNG_VALUE)
    public @ResponseBody byte[] getImage(@PathVariable("dateDir") String dateDir, // yyyymmdd_HHmmssZ
                                         @RequestParam("filaName") String fileName) // A
            throws IOException {
        FileInputStream fis = null;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        String fileDir = resourceLocation + File.separator + dateDir + File.separator + fileName; // 파일경로

        try{
            fis = new FileInputStream(fileDir);
        } catch(FileNotFoundException e){
            e.printStackTrace();
        }

        int readCount = 0;
        byte[] buffer = new byte[1024];
        byte[] fileArray = null;

        try{
            while((readCount = fis.read(buffer)) != -1){
                baos.write(buffer, 0, readCount);
            }
            fileArray = baos.toByteArray();
            fis.close();
            baos.close();
        } catch(IOException e){
            throw new RuntimeException("File Error");
        }
        return fileArray;
    }


    @GetMapping("/health_check")
    public String status(HttpServletRequest request){
        return String.format("It's Working in Catalog Service on Port %s", request.getServerPort());
    }

    @ApiOperation(value="전체 상품 목록", notes="전체 상품 목록")
    @GetMapping("/catalogs")
//    public ResponseEntity<List<ResponseCatalog>> getCatalogs(){
    public ResponseEntity<Page<CatalogEntity>> getCatalogs(final Pageable pageable){
//        List<CatalogEntity> orderList = catalogService.getAllCatalogs();
        Page<CatalogEntity> orderList = catalogService.getAllCatalogs(pageable);


        //todo entity => responseCata에 담기
        List<ResponseCatalog> result = new ArrayList<>();
        orderList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseCatalog.class));
        });

//        orderList.getContent().forEach(v -> {
//            result.add(new ModelMapper().map(v, ResponseCatalog.class));
//        });

//        return ResponseEntity.status(HttpStatus.OK).body(result);
        return ResponseEntity.status(HttpStatus.OK).body(orderList);
    }

    @ApiOperation(value="상세 상품 조회", notes="상세 상품 조회: 카트에서 feignClient를 사용하여 접근")
    @GetMapping("/catalogs/client/{productId}")
    public ResponseEntity<ResponseCatalog> getCatalog(@PathVariable("productId") Long productId){
        log.info("Before retrieve catalgos data");
        CatalogEntity catalog = catalogRepository.findById(productId).get();

        ResponseCatalog result = new ModelMapper().map(catalog, ResponseCatalog.class);
        log.info("After retrieve catalgos data");

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value="상품 등록", notes="상품 등록")
    @PostMapping("/catalogs")
    public ResponseEntity createCatalogs(RequestCatalog catalog, HttpServletRequest req){
        //todo userId가 1번인것도 체크할까?
        if(!req.getHeader("email").equals("admin@admin.com")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        //todo 이미지 받고 경로설정
        //todo 책 중복 검사(isbn 등)
        //todo 에러 메세지
        List<MultipartFile> files = catalog.getFiles();
        if(files.size() > 1){
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body("파일은 1개만 가능합니다.");
        }

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        CatalogDto catalogDto = mapper.map(catalog, CatalogDto.class);
        catalogDto.setCreater(req.getHeader("email"));
        catalogDto.setModifer(req.getHeader("email"));

        if(files == null || files.size() == 0){
            catalogService.createCatalog(catalogDto);
            ResponseCatalog responseCatalog = mapper.map(catalogDto, ResponseCatalog.class);
            return ResponseEntity.status(HttpStatus.CREATED).body(responseCatalog);
        }


        CatalogDto fileAndCatalogDto = null;

        try{
            fileAndCatalogDto = fileUtils.parseFileInfo(catalogDto, files);
        }catch (Exception e){
            log.error(e.getMessage());
        }


        catalogService.createCatalog(fileAndCatalogDto);

        ResponseCatalog responseCatalog = mapper.map(fileAndCatalogDto, ResponseCatalog.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseCatalog);
    }

    @ApiOperation(value="상품 수정", notes="상품 수정")
    @PutMapping("/catalogs/{productId}")
    public ResponseEntity updateCatalogsById(@RequestBody RequestCatalog catalog, @PathVariable Long productId, HttpServletRequest req){
        if(!req.getHeader("email").equals("admin@admin.com")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        //todo 이미지 받고 경로설정
        //todo 수정시 생성일 기존값, 수정일 변경 설정
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        CatalogDto catalogDto = mapper.map(catalog, CatalogDto.class);
        catalogDto.setProductId(productId);
        catalogService.updateCatalog(catalogDto);

        ResponseCatalog responseCatalog = mapper.map(catalogDto, ResponseCatalog.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseCatalog);
    }

    @ApiOperation(value="상품 삭제", notes="상품 삭제")
    @DeleteMapping(value= "/catalogs/{productId}")
    public ResponseEntity deleteCart(@PathVariable("productId") Long productId, HttpServletRequest req) {
        if(!req.getHeader("email").equals("admin@admin.com")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        //TODO 예외 처리
        catalogService.deleteByCartId(productId);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @ApiOperation(value="카테고리별 상품 목록", notes = "카테고리별 상품 목록")
    @GetMapping("/catalogs/{category}")
    public ResponseEntity<List<ResponseCatalog>> getCatalogByCategory(@PathVariable("category") String category){
        //log.info("Before retrieve catalgos data");
        List<CatalogEntity> catalogList = catalogRepository.findByCategory(category);
        List<ResponseCatalog> result = new ArrayList<>();
        //log.info("After retrieve catalgos data");
        catalogList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseCatalog.class));
        });

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "상품 검색", notes = "상품 아이디, 상품 이름, 출판일 검색")
    // value, start, end post형태로 보내기
    @PostMapping("/catalogs/{type}")
    public ResponseEntity searchCategory(@PathVariable("type") String type, @RequestBody RequestSearch requestSearch){
        //log.info("Before retrieve catalgos data");
        // todo 검색 논리 더 단순화 가능
        List<CatalogEntity> catalogList = new ArrayList<>();
        if(type.equals(ID)){
//            if(requestSearch.getValue().)
            catalogList.add(catalogRepository.findById(Long.parseLong(requestSearch.getValue())).get());
        }else if(type.equals(KEYWORD)){
            catalogList = catalogRepository.findByProductNameContaining(requestSearch.getValue());
        }else if(type.equals(DATE)){
            catalogList =
                    catalogRepository.findByPublishDateBetween(requestSearch.getStart(), requestSearch.getEnd());
        }

        List<ResponseCatalog> result = new ArrayList<>();
        //log.info("After retrieve catalgos data");
        catalogList.forEach(v -> {
            result.add(new ModelMapper().map(v, ResponseCatalog.class));
        });
        //log.info("After retrieve catalgos data");
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}

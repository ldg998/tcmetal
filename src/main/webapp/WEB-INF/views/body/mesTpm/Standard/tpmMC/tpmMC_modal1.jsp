<%@ page language="java" contentType="text/html; charset=UTF-8" %> <!-- 페이지 언어, 인코딩 설정 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <!-- JSTL 태그 라이브러리 -->
<script type="text/javascript" src="/data-component/mesTpm/Standard/tpmMC/tpmMC_modal1.js" charset="UTF-8"></script><!-- 스크립트 파일 import -->
<style>
    #gbox_mes_modal_grid{
        border :3px solid #1d1d1d !important;
    }
</style>

<!-- dialog 모달창 설정 -->
<div id="addDialog" title="설비정보 추가" style="display:none">
    <div class="col-lg-12 ">
        <div class="col-lg-8" style="margin-top: 5px;">
            <!-- 버튼 영역-->
            <div class="clearfix">
                <div class="pull-left tableTools-container">
                    <div class="dt-buttons btn-overlap btn-group">
                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" title="" onclick="add_modal1_btn();">
                            <span>
                                <i class="fa fa-plus bigger-110 blue"></i>
                                <span>저장</span>
                            </span>
                        </a>
                        <a class="dt-button buttons-collection buttons-colvis btn btn-white btn-primary btn-mini btn-bold" id="close_btn" onclick="close_modal1_btn();">
                            <span>
                            	 <i class="fa fa-times bigger-110 blue"></i>
                                <span>취소</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 설비정보 데이터 입력 영역 -->
            <table class="table multi_table">
                <tbody>
                <tr>
                    <td class=" td-title t-align-c">설비코드</td>
                    <td>
                        <input name="machine_code" id="machine_code" type="text" class="form-control modal_value"  readonly placeholder="자동생성" >
                    </td>
                    <td class=" td-title t-align-c">설비명</td>
                    <td>
                        <input name="machine_name" type="text" class="form-control modal_value" autocomplete="off" autofocus>
                    </td>
                </tr>
                <tr>
                    <td class=" td-title t-align-c">설치장소</td>
                    <td>
                        <select class="form-control modal_value" id="line_select2" name="line_code" style="width: 100%;">
                            <option value="">선택안함</option>
                        </select>
                    </td>
                    <td class=" td-title t-align-c">자산코드</td>
                    <td>
                        <input name="loc_code" type="text" class="form-control modal_value" autocomplete="off">
                    </td>
                </tr>
                <tr>
                    <td class=" td-title t-align-c">설치일자</td>
                    <td>
                        <div class="input-icon input-icon-right">
                            <input type="text" name="install_date" id="datepicker" class="form-control h-25 modal_value" readonly>
                            <i class="ace-icon fa fa-calendar dark" style="top: -2px;"></i>
                        </div>
                    </td>
                    <td class=" td-title t-align-c">제작금액</td>
                    <td>
                        <input type="text" name="install_amount" id="install_amount" class="form-control modal_value" autocomplete="off" onkeyup="num_keyup_comma(this)" style="text-align: right;">
                    </td>
                </tr>
                <tr>
                    <td class=" td-title t-align-c">등급</td>
                    <td>
                        <input type="text" name="level" class="form-control modal_value" autocomplete="off">
                    </td>

                    <td class=" td-title t-align-c">중점관리</td>
                    <td>
                        <select class="form-control modal_value ynCheck"  name="focus_yn" id="focus_yn_modal" style="width:100%">
                            <option value="Y">유</option>
                            <option value="N">무</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class=" td-title t-align-c">제작업체</td>
                    <td>
                        <input type="text" name="install_corp_name" class="form-control modal_value" autocomplete="off" />
                    </td>
                    <td class=" td-title t-align-c">업체담당자</td>
                    <td>
                        <input type="text" name="corp_user_name" class="form-control modal_value" autocomplete="off" />
                    </td>
                </tr>
                <tr>
                    <td class=" td-title t-align-c">설비관리자</td>
                    <td>
                        <input type="text" name="machine_manager" class="form-control modal_value" autocomplete="off">
                    </td>
                    <td class=" td-title t-align-c">업체담당자(연락처)</td>
                    <td>
                        <input type="text" name="corp_tel_no" class="form-control modal_value" autocomplete="off">
                    </td>
                </tr>
                <tr>
                    <td class=" td-title t-align-c">비고</td>
                    <td colspan="3">
                        <input type="text" name="remark" class="form-control modal_value" autocomplete="off">
                    </td>
                </tr>
                </tbody>
            </table>

            <!-- 버튼 영역 -->
            <div class="clearfix">
                <div class="pull-left tableTools-container">
                    <div class="dt-buttons btn-overlap btn-group">
                        <a class="dt-button buttons-csv buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                           tabindex="0" aria-controls="dynamic-table" data-original-title="" title=""
                           onclick="part_add_btn()">
                            <span>
                                <i class="fa fa-plus bigger-110 blue"></i>
                                <span>부품추가</span>
                            </span>
                        </a>
                        <a class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold"
                           title=""
                           onclick="part_delete_btn();">
                            <span>
                                <i class="fa fa-trash bigger-110 blue"></i>
                                <span>부품삭제</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 그리드 영역-->
            <div class="row">
                <div class="col-xs-12 table-responsive">
                    <table id="mes_modal_grid" style="margin-bottom: 5px !important;"></table>
                </div>
            </div>

        </div>

        <!-- 이미지 넣는 영역 -->
        <div class="col-lg-4">
            <div class="col-12 img-title">
                <div class="col-lg-12 ">
                    <span class="sp-title">img1</span>
                    <div class="dt-buttons btn-overlap btn-group filebox">
                        <label for="xlsUploads1" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold">
                            <i class="fa fa-upload bigger-110 blue"></i>
                            파일찾기
                        </label>
                        <input type="file" id="xlsUploads1" name="files1" class="upload-hidden" onchange="readURL(this,1)">
                        <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="readURLRemove(1)">
                            <span>
                                <i class="fa fa-trash bigger-110 blue"></i>
                                <span id="del1">삭제</span>
                            </span>
                        </label>
                    </div>
                    <div class="col-lg-12">
                        <div class="img-wrap" id="img_div1" style="border: 2px solid #1d1d1d; width: 100%; height: 150px; margin-top: 5px; margin-bottom: 5px;">
                            <div class="img-text" id="img-text1">미리보기가 표시됩니다.</div>
                            <img style="width: 100%; height: 100%;" id="img1">
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 ">
                    <span class="sp-title">img2</span>
                    <div class="dt-buttons btn-overlap btn-group filebox">
                        <label for="xlsUploads2" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold">
                            <i class="fa fa-upload bigger-110 blue"></i>
                            파일찾기
                        </label>
                        <input type="file" id="xlsUploads2" name="files2" class="upload-hidden" onchange="readURL(this,2)">
                        <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="readURLRemove(2)">
                            <span>
                                <i class="fa fa-trash bigger-110 blue"></i>
                                <span id="del2">삭제</span>
                            </span>
                        </label>
                    </div>
                    <div class="col-lg-12">
                        <div class="img-wrap" id="img_div2" style="border: 2px solid #1d1d1d; width: 100%; height: 150px; margin-top: 5px; margin-bottom: 5px;">
                            <div class="img-text" id="img-text2">미리보기가 표시됩니다.</div>
                            <img style="width: 100%; height: 100%;" id="img2">
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 ">
                    <span class="sp-title">img3</span>
                    <div class="dt-buttons btn-overlap btn-group filebox">
                        <label for="xlsUploads3" class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold">
                            <i class="fa fa-upload bigger-110 blue"></i>
                            파일찾기
                        </label>
                        <input type="file" id="xlsUploads3" name="files3" class="upload-hidden" onchange="readURL(this,3)">
                        <label class="dt-button buttons-copy buttons-html5 btn btn-white btn-primary btn-mini btn-bold" onclick="readURLRemove(3)">
                            <span>
                                <i class="fa fa-trash bigger-110 blue"></i>
                                <span id="del3">삭제</span>
                            </span>
                        </label>
                    </div>
                    <div class="col-lg-12">
                        <div class="img-wrap" id="img_div3" style="border: 2px solid #1d1d1d; width: 100%; height: 150px; margin-top: 5px; margin-bottom: 5px;">
                            <div class="img-text" id="img-text3">미리보기가 표시됩니다.</div>
                            <img style="width: 100%; height: 100%;" id="img3">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

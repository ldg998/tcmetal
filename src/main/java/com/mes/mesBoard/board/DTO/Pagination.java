package com.mes.mesBoard.board.DTO;

import lombok.Data;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Data
public class Pagination {
    private int page;
    private int perPageNum;
    private int pageStart;
    private int totalCount;
    private int startPage;
    private int endPage;
    private boolean prev;
    private boolean next;
    private int displayPageNum;
    private int tempEndPage;
    private String type="";
    private String keyword="";
    private String key;
    private String site_code;
    private String user_code;
    private String startDate;
    private String endDate;
    private String id;
    private String board_code;
    private String idx;

    public Pagination() {
        this.displayPageNum = 5;
        this.page = 1;
        this.perPageNum = 10;
    }

    public void setPage(final int page) {
        if (page <= 0) {
            this.page = 1;
            return;
        }
        this.page = page;
    }

    public void setPerPageNum(final int perPageNum) {
        if (perPageNum <= 0 || perPageNum > 100) {
            this.perPageNum = 10;
            return;
        }
        this.perPageNum = perPageNum;
    }

    public int getPageStart() {
        return this.pageStart = (this.page - 1) * this.perPageNum;
    }

    public void setTotalCount(final int totalCount) {
        this.totalCount = totalCount;
        this.calcData();
    }

    private void calcData() {
        this.endPage = (int) (Math.ceil(this.page / (double) this.displayPageNum) * this.displayPageNum);
        this.startPage = this.endPage - this.displayPageNum + 1;
        this.tempEndPage = (int) Math.ceil(this.totalCount / (double) this.perPageNum);
        if (this.endPage > this.tempEndPage) {
            this.endPage = this.tempEndPage;
        }
        this.prev = (this.startPage != 1);
        this.next = (this.endPage * this.perPageNum < this.totalCount);
    }

    public String searchOption(final int page) {
        final UriComponents uriComponents = UriComponentsBuilder.newInstance().queryParam("page", new Object[]{page}).queryParam("perPageNum", new Object[]{this.perPageNum}).queryParam("type", new Object[]{this.type}).queryParam("keyword", new Object[]{this.keyword}).queryParam("key", new Object[]{this.key}).build();
        return uriComponents.toUriString();
    }

    @Override
    public String toString() {
        return "Pagenation [page=" + this.page + ", " +
                "perPageNum=" + this.perPageNum +
                ", pageStart=" + this.pageStart +
                ", totalCount=" + this.totalCount +
                ", startPage=" + this.startPage +
                ", endPage=" + this.endPage +
                ", prev=" + this.prev +
                ", next=" + this.next +
                ", displayPageNum=" + this.displayPageNum +
                ", tempEndPage=" + this.tempEndPage +
                ", searchType=" + this.type +
                ", keyword=" + this.keyword +
                "]";
    }

    public String _pagination(final String url) {
        final StringBuffer sBuffer = new StringBuffer();
        sBuffer.append("<ul class='pagination'>");
        if (this.prev) {
            sBuffer.append("<li><a href='" + url + this.searchOption(1) + "'>\ucc98\uc74c</a></li>");
        }
        if (this.prev) {
            sBuffer.append("<li><a href='" + url + this.searchOption(this.startPage - 1) + "'><</a></li>");
        }
        String active = "";
        for (int i = this.startPage; i <= this.endPage; ++i) {
            if (this.page == i) {
                active = "active'";
            } else {
                active = "";
            }
            sBuffer.append("<li>");
            sBuffer.append("<a class='" + active + "' href='" + url + this.searchOption(i) + "'>" + i + "</a></li>");
            sBuffer.append("</li>");
        }
        if (this.next && this.endPage > 0) {
            sBuffer.append("<li><a href='" + url + this.searchOption(this.endPage + 1) + "'>></a></li>");
        }
        if (this.next && this.endPage > 0) {
            sBuffer.append("<li><a href='" + url + this.searchOption(this.tempEndPage) + "'>\ub05d</a></li>");
        }
        sBuffer.append("</ul>");
        return sBuffer.toString();
    }
}
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
declare var jQuery: any;

@Component({
  selector: 'app-article-list-header',
  templateUrl: './article-list-header.component.html',
  styleUrls: ['./article-list-header.component.css']
})
export class ArticleListHeaderComponent implements OnInit {

  private currentFilter: string = 'Time';
  private sortDirection: number = 1;

  constructor(
    private articleService: ArticleService
  ) { }

  changeDirection() {
    // update the direction
    this.sortDirection = this.sortDirection * -1;
    this._updateSort();
  }

  changeSort(filter: string) {
    // update the filter
    if (filter === this.currentFilter) {
      this.changeDirection();
    } else {
      this.currentFilter = filter;
      this._updateSort();
    }
  }

  liveSearch(evt) {
    const val = evt.target.value;
    this.articleService.filterBy(val);
  }

  _updateSort() {
    // call sortBy on the article service
    this.articleService
      .sortBy(
        this.currentFilter,
        this.sortDirection);
  }

  ngOnInit() {
    jQuery('.ui.dropdown').dropdown();
  }

}

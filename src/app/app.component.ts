import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private savedPosts: any[];
  public posts: any[];
  public categories: any[];
  public displayArticle: boolean = false;
  public article: string;

  constructor(private http: HttpClient) { }

  public ngOnInit(): void {
    this.http.get('assets/posts.json').subscribe((data: any) => {
      this.savedPosts = this.posts = data;
    });

    this.http.get('assets/categories.json').subscribe((data: any) => {
      this.categories = data;
    });
  }

  public getCategory(value: any): void {
    this.posts = this.savedPosts;

    if (value.target.value != "All categories") {
      const categoryId = this.categories.find(categoty => {
        return categoty.name == value.target.value;
      });

      this.posts = this.posts.filter(element => {
        return element.category == categoryId.id;
      });
    }
  }

  public ascendingSort(): void {
    this.posts.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return 1;
      }

      if (a.createdAt < b.createdAt) {
        return -1;
      }

      return 0;
    });
  }

  public descendingSort(): void {
    this.posts.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      }

      if (a.createdAt > b.createdAt) {
        return -1;
      }

      return 0;
    });
  }

  public readArticle(element: any): void {
    this.displayArticle = !this.displayArticle;
    this.article = element.message;
  }

  public finishRead(): void {
    this.displayArticle = !this.displayArticle;
    this.posts = this.savedPosts;
  }
}

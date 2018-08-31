import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { UserService } from '../../services/user.service';
import { User } from '../../Models/user';
import { PostService } from '../../services/post.service';
import { Post } from '../../Models/post';
import { timer } from 'rxjs/internal/observable/timer';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService, UserService, NGXLogger]
})
export class PostComponent implements OnInit {

  posts = [];
  usersToSearch = [];
  currentUser: User;
  newPost = new Post();
  newUser = new User();
  maxUserId = 0;
  timeIt = timer(1, 10000);

  constructor(private postService: PostService, private userService: UserService, private logger: NGXLogger) { }

  // При первом вызове компонента вызывается метод сервиса, который
  // возвращает все посты, которые он нашел по АПИшке, и добавляет их
  // в локальный массив, который в свою очередь общаеться с формой 
  // хтмл файла. 
  ngOnInit() {
    this.timeIt.subscribe(x => this.loadPosts());
    this.loadCurrentUser();
  }

  // добавляет новый пост в список постов залогиненого юзера
  onSay() {
    if (
      this.newPost.message.length <= 256 &&
      this.newPost.message.length > 0) {
      this.loadPosts();

      this.newPost.id_user=this.currentUser.id;
      this.newPost.username=this.currentUser.login;
      this.newPost.post_date = new Date();
      this.postService.createPost(this.newPost)
        .subscribe((data: Post) => this.posts.push(data));

      this.logger.info('Added new post');
      this.newPost = new Post();
      this.newUser = new User();
    }
  }

  loadPosts() {
    this.userService.getUsers()
      .subscribe((data: User[]) => this.usersToSearch = data);
    this.postService.getPosts()
      .subscribe((data: Post[]) => this.posts = data);

  }

  loadCurrentUser() {
    this.userService.getCurrent()
      .subscribe((data: User) => this.currentUser = data);
  }

  getPostDate(date: Date) {
    var yyyy = date.getFullYear().toString();
    var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();
    var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours().toString();
    var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes().toString();
    return "".concat(yyyy).concat(mm).concat(dd).concat(hh).concat(min);
  }
}


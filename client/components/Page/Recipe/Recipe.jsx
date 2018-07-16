import React from 'react';
import classes from './Recipe.css';
/**
 * @function recipe
 * @param {*} props
 * @returns {JSX} jsx
 */
/* eslint-disable */
const recipe = props => (
    /* eslint-enable */
<div class="card mt-2">
    <div class="card-body">
        <div class="menu">
            <div class="item" data-value="jenny">
                <!-- post tags -->
                <div class="row">
                    <div class="col-md-8 col-xs-2">
                        <img class="ui mini avatar image" src="./images/person-1.jpg">
                        <a href="" class="user">Jenny Hess</a href="">
                        <span class="p-1">and</span>
                        <a href="" class="second-user">akolliy and babsreal</a>
                    </div>
                    <!-- the dropdown option may be delete or edit -->
                    <div class="col-md-4 col dropdown no-border">
                        <span class="only-me color" style="float:right;cursor:pointer" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">...</span>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Hide</a>
                            <a class="dropdown-item" href="#">Save Link</a>
                            <a class="dropdown-item" href="#">Give feedback on this post</a>
                        </div>
                    </div>
                    <!-- End of dropdown -->
                </div>
                <div class="meta">
                    <span class="date mt-2">29 April at 07:29 </span>
                </div>
                <div class="description mt-4">
                    <p>Kristy is an art director living in New York.</p>
                </div>
                <div class="image mt-3 float-left">
                    <button type="button" class="btn btn-default">
                        <span class="badge badge-light">500k</span>
                        <span class="sr-only">unread messages</span>
                        Views
                    </button>
                    <img src="./img/Fast-food-img-1.jpg" alt="" class="card-img-top">
                    
                </div>
                <div class="clear"></div>
                <div class="card-footer">
                    <div class="row justify-center">
                        <a href="#" class="card-footer-item col-md-3 col">
                            <span class="far fa-thumbs-down pl-2 turn color"></span> Hit</a>
                        <a href="#" class="card-footer-item col-md-4 col">
                            <span class="far fa-comment-alt pl-2 color flip"></span> Comment</a>
                        <!-- <a href="#" class="card-footer-item col-md-3 col">
                            <span class="far fa-eye pl-2 turn color"></span>100k</a> -->
                        <a href="#" class="card-footer-item col-md-4 col">
                            <span class="far fa-hand-rock pl-2 turn color"></span>Knock</a>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="">
                        <button type="button" class="btn btn-default">
                            <span class="badge badge-light">500k</span>
                            <span class="sr-only">unread messages</span>
                            Hits
                        </button>
                        <button type="button" class="btn btn-light">
                            <span class="badge badge-light">0</span>
                            <span class="sr-only">unread messages</span>
                            Knock
                        </button>
                        <!-- button to display comment -->
                        <button type="button" class="btn btn-light">
                            <span class="badge badge-light">30</span>
                            <span class="sr-only">unread messages</span>
                            comments
                        </button>
                    </div>
                    <!-- the commentary -->
                    <div class="ui feed">
                        <div class="event">
                            <div class="label">
                                <img src="./img/Fast-food-img-1.jpg">
                            </div>
                            <div class="content">
                                <div class="summary">
                                    <a class="user">
                                        Elliot Fu
                                    </a> added you as a friend
                                    <div class="date">
                                        1 Hour Ago
                                    </div>
                                </div>
                                <div class="meta">
                                    <a class="like">
                                        <i class="like icon"></i> 4 Likes
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="event">
                            <div class="label">
                                <img src="./img/sitttin-img-1.jpg">
                            </div>
                            <div class="content">
                                <div class="summary">
                                    <a>Joe Henderson</a> posted on his page
                                    <div class="date">
                                        3 days ago
                                    </div>
                                </div>
                                <div class="extra text border-left">
                                    Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all over again. Even
                                    if we don't run extra laps that day, we surely will come back for
                                    more of the same another day soon.
                                </div>
                                <div class="meta">
                                    <a class="like">
                                        <i class="like icon"></i> 5 Likes
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="event">
                            <div class="label">
                                <img src="./img/udemy-img.jpg">
                            </div>
                            <div class="content">
                                <div class="summary">
                                    <a>Helen Troy</a> added
                                    <a>2 new illustrations</a>
                                    <div class="date">
                                        4 days ago
                                    </div>
                                </div>
                                <div class="extra images">
                                    <a>
                                        <img src="./img/banner-img-3.jpg">
                                    </a>
                                    <a>
                                        <img src="./img/banner-img-4.jpg">
                                    </a>
                                </div>
                                <div class="meta">
                                    <a class="like">
                                        <i class="like icon"></i> 1 Like</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <img src="./img/banner-img-2.jpg" alt="" class="card-images"> -->
    </div>
</div>
<!-- End here -->
);

export default recipe;

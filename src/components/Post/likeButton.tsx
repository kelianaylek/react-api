import React, {SyntheticEvent, useState} from "react";
import {Redirect} from 'react-router-dom'
import Cookies from "js-cookie";

class LikeButton extends React.Component<any, any> {
    state = {
        post : this.props.post,
        id : this.props.id,
    }

    submit = async (isLiked:any) =>{
        const token = Cookies.get('token');

        if(isLiked === true){
            await fetch('https://apisymfonykelian.herokuapp.com/api/posts/removeLike/' + this.state.post.id, {
                method : 'PUT',
                headers : {"Authorization" : "Bearer " + token},
            })
            window.location.reload();
        }
        else if(isLiked === false){
            await fetch('https://apisymfonykelian.herokuapp.com/api/posts/addLike/' + this.state.post.id, {
                method : 'PUT',
                headers : {"Authorization" : "Bearer " + token},
            })
            window.location.reload();
        }

    }

    render() {
        let isLiked = false;

        return (

            <div>
                {this.state.post?.likedBy?.map((user:any) => {
                    if(user.id === this.props.id){
                        isLiked = true
                    }
                })}

                <button onClick={() => this.submit(isLiked)}>{isLiked ? 'Dislike' : 'Like'} </button>

            </div>
        );
    }
}
{}
export default LikeButton;
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
            }).then(res => res.json())
                .then((data) => {
                    this.setState({ post : data })
                })
                .catch(console.log)


        }
        else if(isLiked === false){
            await fetch('https://apisymfonykelian.herokuapp.com/api/posts/addLike/' + this.state.post.id, {
                method : 'PUT',
                headers : {"Authorization" : "Bearer " + token},
            }).then(res => res.json())
                .then((data) => {
                    this.setState({ post : data })
                })
                .catch(console.log)
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
                <h6 className="card-subtitle mb-2 text-muted">Likes : {this.state.post?.likedBy.length}</h6>

                <button onClick={() => this.submit(isLiked)}>{isLiked ? 'Dislike' : 'Like'} </button>

            </div>
        );
    }
}
{}
export default LikeButton;
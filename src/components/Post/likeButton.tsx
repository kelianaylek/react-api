import React from "react";
import Cookies from "js-cookie";
import { HiOutlineThumbUp, HiOutlineThumbDown } from "react-icons/hi";

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
                <button className="btn btn-outline-danger" onClick={() => this.submit(isLiked)}>
                    {isLiked ?
                        <>{this.state.post?.likedBy.length}<HiOutlineThumbDown color="red"></HiOutlineThumbDown></>
                            :
                        <>{this.state.post?.likedBy?.length} <HiOutlineThumbUp></HiOutlineThumbUp></>
                } </button>

            </div>
        );
    }
}

export default LikeButton;
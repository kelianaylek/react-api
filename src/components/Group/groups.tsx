import React from 'react'
import {Link} from "react-router-dom";
import CreateGroupModal from "../../components/Modals/CreateGroupModal"

const Groups = ({ groups, id, refreshGroups }: any) => {

    return (
        <div>
            <div className="pr-4 pl-4 d-flex justify-content-between">
                <h1>Group List</h1>
                <div>
                    <CreateGroupModal refreshGroups={refreshGroups}></CreateGroupModal>

                </div>
            </div>


            <div className="d-flex justify-content-around flex-wrap mt-4">
                {groups.map((group :any) => {
                    return(
                        <>
                            {group.users?.map((user :any) => {
                                if(user.id === id){
                                    return(
                                        
                                        <div key={group.id} className="card w-30 mb-4">

                                            <div className="card-body">
                                                <p>{group.name}</p>
                                            </div>
                                            <button>
                                                <Link to={{
                                                    pathname: `/group/${group.id}`,
                                                    state : {
                                                        group : group.id,
                                                        id : id
                                                    }
                                                }}
                                                >
                                                    View Group
                                                </Link>
                                            </button>
                                        </div>
                                    )
                                }
                            })}
                        </>
                    )


                })}
            </div>
        </div>
    )
};

export default Groups
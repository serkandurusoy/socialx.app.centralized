import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const commentMut = gql`
    mutation comment($type: CommentType!, $targetUser: ID, $targetPost: ID, $text: String){
        comment(type: $type, targetUser: $targetUser, targetPost: $targetPost, text: $text){
            id
        }
    }
`;

const getCommentsQ = gql`
    query getComments($targetPost: ID, $targetUser: ID){
        getComments(targetPost: $targetPost, targetUser: $targetUser)(
            id
            type
            createdAt
            likes{
                userId
            }
            owner {
                userId
                avatar {
                    id
                    hash
                }
            }
            comments {
                id
                type
                createdAt
                likes{
                    userId
                }
                owner {
                    userId
                    avatar {
                        id
                        hash
                    }
                }
            }
        )
    }
`;

export const commentHoc = (comp: any) => graphql(commentMut, { name: 'comment' })(comp);

export const getCommentsHoc = (comp: any) => graphql(getCommentsQ, { name: 'Comments' })(comp);

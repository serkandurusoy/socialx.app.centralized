import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const commentMut = gql`
    mutation comment($targetUser: ID, $targetPost: ID, $text: String!) {
        comment(targetUser: $targetUser, targetPost: $targetPost, text: $text) {
            id
        }
    }
`;

const getCommentsQ = gql`
    mutation getComments($targetPost: ID, $targetUser: ID) {
        getComments (targetPost: $targetPost, targetUser: $targetUser) {
            id
            createdAt
            text
            likes {
                userId
            }
            owner {
                userId
                name
                avatar {
                    id
                    hash
                }
            }
            comments {
                id
                createdAt
                likes {
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
        }
    }
`;

const likeCommentMut = gql`
    mutation likeComment($commentId: ID!) {
        likeComment(commentId: $commentId) {
            id
        }
    }
`;

const removeCommentLikeMut = gql`
    mutation removeCommentLike($commentId: ID!) {
        removeCommentLike(commentId: $commentId) {
            id
        }
    }
`;

export const commentHoc = (comp: any) => graphql(commentMut, { name: 'comment' })(comp);

export const getCommentsHoc = (comp: any) => graphql(getCommentsQ, { name: 'getComments' })(comp);

export const likeCommentHoc = (comp: any) => graphql(likeCommentMut, { name: 'likeComment' })(comp);
export const removeCommentLikeHoc = (comp: any) => graphql(removeCommentLikeMut, { name: 'removeCommentLike'})(comp);

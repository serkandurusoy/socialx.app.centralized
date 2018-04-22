import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const commentMut = gql`
    mutation comment($targetComment: ID, $targetPost: ID, $text: String!) {
        comment(targetComment: $targetComment, targetPost: $targetPost, text: $text) {
            id
        }
    }
`;

const getCommentsQ = gql`
    mutation getComments($targetPost: ID, $targetComment: ID) {
        getComments (targetPost: $targetPost, targetComment: $targetComment) {
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

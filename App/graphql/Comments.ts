import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const likePost = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id,
            likes {
			    userId,
			    username
			}
        }
    }
`;

const removeLikePost = gql`
    mutation removelikePost($postId: ID!){
        removelikePost(postId: $postId){
            id,
            likes {
			    userId,
			    username
			}
        }
    }
`;

export const likePostHoc = (comp: any) => graphql(likePost, { name: 'likePost' })(comp);

export const removeLikePostHoc = (comp: any) => graphql(removeLikePost, { name: 'removeLikePost' })(comp);

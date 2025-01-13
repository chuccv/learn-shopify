const axios = require('axios');

async function getUser() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');

        return response.data.map(({ id, name, username, email }) => ({ id, name, username, email }));
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
}

async function getPosts() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

        return response.data;
    } catch (error) {
        throw new Error('Error fetching posts: ' + error.message);
    }
}

async function getComments() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');

        return response.data;
    } catch (error) {
        throw new Error('Error fetching comments: ' + error.message);
    }
}

async function mapData() {
    try {
        const [users, posts, comments] = await Promise.all([
            getUser(),
            getPosts(),
            getComments()
        ]);
        // console.log({ users, posts, comments });
        //Get all the posts and comments from the API. Map the data with the users array. The data format should be like this:
        users.map(function (user) {
            const userPosts = posts.filter(post => post.userId === user.id);
            user.posts = userPosts;
            const userComments = comments.filter(comment => comment.email === user.email);
            user.comments = userComments;
        });

        console.log('users:');
        // console.log(users.posts);
        // Filter only users with more than 3 comments.
        const usersFilter = users.filter(user => user.comments.count >= 3);
        // console.log(usersFilter);

        // Reformat the data with the count of comments and posts
        users.map(function (user) {
            const postsCount = user.posts.reduce(function (sum) {
                return sum + 1
            }, 0);
            user.postsCount = postsCount;
            const commentsCount = user.comments.reduce(function (sum) {
                return sum + 1
            }, 0);
            user.commentsCount = commentsCount;
        });
        console.log(users)

        //Who is the user with the most comments/?
        const mostUserPost = users.reduce(function (mostCountPost, user) {
            return Math.max(mostCountPost, user.postsCount);
        }, 0);
        const userWithMostPosts = users.filter(user => user.postsCount === mostUserPost);
        // console.log('userWithMostPosts')
        // console.log(userWithMostPosts)
        //Who is the user with the most comments?
        const mostUserCommnent = users.reduce(function (mostUserCommnent, user) {
            return Math.max(mostUserCommnent, user.commentsCount);
        }, 0);

        const userWithMostComments = users.filter(user => user.commentsCount === mostUserCommnent);
        // console.log('userWithMostComments')
        // console.log(userWithMostComments)

        //Sort the list of users by the postsCount value descending?
        users.sort((a, b) => a.postsCount - b.postsCount);
        // console.log('users Sorted ');
        // console.log(users);

        //Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request. Merge the post data with format:
        const postId = posts.filter(post => post.id === 1);
        if (postId) {
            const postId1 = postId[0];
            postId1.comments =  comments.filter(comment => comment.postId === postId1.id);
            // console.log('postId1')
            // console.log(postId1)
        }

    } catch (error) {
        console.error("Error mapping data: ", error.message);
    }
}

mapData();

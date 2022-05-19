//header
export const paramsCreatePost = {
    headers: {
        'Content-Type': 'application/json'
    }
};
export const payload = JSON.stringify({           
        userId: 1 ,
        id: 1,
        title: 'Lorem Ipsum',
        body: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'    
    })
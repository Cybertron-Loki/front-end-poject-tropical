
const currentUserId = localStorage.getItem('userId'); 

// Fetch data from Strapi API
async function fetchConcerts() {
    try {
        const response = await fetch('http://localhost:1337/api/tickets?populate=concert_ticket', {
            headers: {
                'Authorization': `Bearer 2c09109074d12610bd81ca478ced9a0c0b2b371f2aa177017c9fb81970d1a15b9ce1028bf291bd7b7b44498f4d4ea89b88b814fdbb2e3a8676d46ecb5e483ca51100858d27028f524658a769f460a538f6e90aa548db0736312361b499f6073b56ca6709d2d3e5c6be14a5041af911c94ba549fb6475ec4d00930b6147d6632b `
            
            }
        });
        const data = await response.json();
        // favoriteConcertIds = await fetchFavoriteConcerts(currentUserId);  // 获取当前用户已收藏的 concert ID
        renderConcerts(data.data);
    } catch (error) {
        console.error('Error fetching concerts:', error);
    }
}

// Fetch favorite concerts for the current user from Strapi API
async function fetchFavoriteConcerts(userId) {
    try {
        // const response = await fetch(`http://localhost:1337/api/collection?userId=${userId}`); // 传递用户 ID
        const data = await response.json();
        return data.map(item => item.concertId); // 假设返回的对象中有 concertId 属性
    } catch (error) {
        console.error('Error fetching favorite concerts:', error);
        return []; // 返回空数组以防止后续错误
    }
}


async function renderConcerts(concerts) {
    const concertsContainer = document.getElementById('concerts');
    concertsContainer.innerHTML = ''; // 清空容器
    concerts.forEach(concert => {
        const card = document.createElement('div');
        card.className = 'col-md-6 mb-4';
        console.log(concert);
        // const isFavorited = favoriteConcertIds.includes(concert.id); // 检查是否已收藏
        card.innerHTML = `
            <div class="card">
                 
                
                <div class="card-body">
                    <h5 class="card-title">${concert.title}</h5>
                    <img src="${concert.poster}" class="card-img-top" alt="${concert.poster}">
                    <p class="card-text"><strong>time:</strong>${concert.performanceDate}</p>
                    <p class="card-text"><strong>place:</strong>${concert.place}</p>
                    <p class="price">price：¥${concert.concert_ticket.priceA}+</p>
                    <a href="ticket.html?id=${concert.concert_ticket.id}&title=${concert.title}" class="btn btn-primary">查看详情</a>
                </div>
            </div>
        `;
        concertsContainer.appendChild(card);
    });
}

// Function to toggle favorite icon
// async function toggleFavorite(element, concertId) {
//     const isFavorited = element.classList.contains('fas');
//     if (isFavorited) {
//         await removeFromFavorites(concertId);
//     } else {
//         await addToFavorites(concertId);
//     }

//     // 切换图标
//     element.classList.toggle('fas');
//     element.classList.toggle('far');

//     // 刷新已收藏的音乐会ID列表
//     favoriteConcertIds = await fetchFavoriteConcerts(currentUserId);
//     renderConcerts(await fetch('http://localhost:1337/api/concerts').then(res => res.json()).then(data => data.data));
// }

// // Add concert to favorites
// async function addToFavorites(concertId) {
//     try {
//         const jwt = localStorage.getItem('jwt');
//         const response = await fetch('http://localhost:1337/api/collection', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${jwt}`
//             },
//             body: JSON.stringify({
//                 data: {
//                     userId: currentUserId,
//                     concertId: concertId
//                 }
//             })
//         });

//         if (!response.ok) {
//             throw new Error('Failed to add concert to favorites');
//         }

//         const toast = new bootstrap.Toast(document.getElementById('favoriteSuccessToast'));
//         toast.show();
//     } catch (error) {
//         console.error('Error adding concert to favorites:', error);
//         const toast = new bootstrap.Toast(document.getElementById('favoriteErrorToast'));
//         toast.show();
//     }
// }

// // Remove concert from favorites
// async function removeFromFavorites(concertId) {
//     try {
//         const jwt = localStorage.getItem('jwt');
//         // 假设你需要通过concertId和userId来查找并删除收藏
//         const response = await fetch('http://localhost:1337/api/collection', {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${jwt}`
//             },
//             body: JSON.stringify({
//                 data: {
//                     userId: currentUserId,
//                     concertId: concertId
//                 }
//             })
//         });

//         if (!response.ok) {
//             throw new Error('Failed to remove concert from favorites');
//         }

//         const toast = new bootstrap.Toast(document.getElementById('favoriteSuccessToast'));
//         toast.show();
//     } catch (error) {
//         console.error('Error removing concert from favorites:', error);
//         const toast = new bootstrap.Toast(document.getElementById('favoriteErrorToast'));
//         toast.show();
//     }
// }

// Fetch concerts on page load
window.onload = fetchConcerts;


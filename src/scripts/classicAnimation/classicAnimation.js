
$(document).ready(function () {
    $('#classicAnimationCarousel').carousel();
});

// Sample data - replace this with your actual data
const contentData = [
    { title: "The Legend Of Sealed Book", image: "../assets/image/classicAnimation/nvYaoGuai.jpg", hoverText: "An imaginative and creative animated film." },
    { title: "Ginseng Fruit", image: "../assets/image/classicAnimation/11.jpg", hoverText: "Adapted from the classic Chinese literary work 'Journey to the West'." },
    { title: "Three Monks", image: "../assets/image/classicAnimation/monk.webp", hoverText: "It integrates modern comic techniques into its own national style." },
    { title: "Prince Nezha's Triumph Against Dragon King", image: "../assets/image/classicAnimation/neZhaNaoHai.jpg", hoverText: "Childhood memories of Chinese people." },
    { title: "Yao-Chinese Folktales", image: "../assets/image/classicAnimation/zhongGuoQiTan.webp", hoverText: "The clean and pure Chinese art films have returned." },
    { title: "Small Tadpole Looks for Mother", image: "../assets/image/classicAnimation/keDou.webp", hoverText: "China's first ink wash animation film." },
    { title: "Snipe-Clam Grapple", image: "../assets/image/classicAnimation/1.jpg", hoverText: "Adapted from a traditional Chinese fable." },
    { title: "Calabash Brothers", image: "../assets/image/classicAnimation/10.webp", hoverText: "One of the most influential representative works of Chinese animation." },
    { title: "The Snow Child", image: "../assets/image/classicAnimation/3.jpg", hoverText: "Simple and pure design and story." },
    { title: "No-brain and Unhappiness", image: "../assets/image/classicAnimation/4.jpg", hoverText: "A representative work of the Chinese School of Animation." },
    { title: "Shuke and Beita", image: "../assets/image/classicAnimation/5.jpg", hoverText: "A partial critique of the educational system at the time." },
    { title: "The Story of Avanti", image: "../assets/image/classicAnimation/12.jpg", hoverText: "A person with a sense of justice who can uphold their principles." },
    { title: "Mad for Music", image: "../assets/image/classicAnimation/7.jpg", hoverText: "An alternative in Chinese animation." },
    { title: "A Big Cabbage", image: "../assets/image/classicAnimation/8.jpg", hoverText: "Innovative origami animation." },
    { title: "Pigsy Eats Watermelon", image: "../assets/image/classicAnimation/11.webp", hoverText: "Paper-cut animation born for the exploration of animation art." },
    { title: "Sanmao Wandering Record", image: "../assets/image/classicAnimation/13.jpg", hoverText: "It mainly portrays the confrontation and struggle between justice and evil, light and darkness." }
    // Add more items as needed
];


// Function to generate content HTML
function generateContentHTML(data) {
    return `
        <div class="row">
            ${data.map(item => `
                <div class="col-md-3">
                    <div class="hover-text" data-hovertext="${item.hoverText}">
                        <img src="${item.image}" class="img-fluid">
                        <a href="#" title="这是鼠标悬浮文案">details</a>
                    </div>
                    <p class="intro">${item.title}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// Function to generate pagination HTML
function generatePaginationHTML(totalPages) {
    return Array.from({ length: totalPages }, (_, index) => `
        <li class="page-item"><a class="page-link" href="#" onclick="showPage(${index + 1})">${index + 1}</a></li>
    `).join('');
}

// Function to show content for a specific page
function showPage(pageNumber) {
    const itemsPerPage = 8; // Change this as needed
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = contentData.slice(startIndex, endIndex);
    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = generateContentHTML(paginatedData);
}

// Initialize pagination
const totalPages = Math.ceil(contentData.length / 8); // Change this as needed
const pagination = document.getElementById('pagination');
pagination.innerHTML = generatePaginationHTML(totalPages);

// Show first page initially
showPage(1);

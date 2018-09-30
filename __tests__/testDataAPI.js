import StateAPI from "server/api/StateAPI";
import jsonTestData from "jsonData/react-blog-mockup-data.json";

const data = jsonTestData.data;
const store = new StateAPI(data);

describe("Data API", ()=>{
    test("Exposes Articles as an object", ()=>{
        const {articles} = store.getState();
        const articleId = data.articles[0].id;
        const articleTitle = data.articles[0].title;

        expect(articles).toHaveProperty(articleId);
        expect(articles[articleId].title).toBe(articleTitle);
    });
    test("Exposes Author as an object", ()=>{
        const {authors} = store.getState();
        const authorId = data.authors[0].id;
        const authorFirstName = data.authors[0].firstName;

        expect(authors).toHaveProperty(authorId);
        expect(authors[authorId].firstName).toBe(authorFirstName);    
    })
});
// import { LanguageJSON } from "../interfaces/api/language.interface.js"

// export class FetchData
// {
//     private url: string;

//     constructor(url: string)
//     {
//         this.url = url;
//     }

//     async fetchJsonData(): Promise<LanguageJSON[]>
//     {
//         const res = await fetch(this.url);

//         if (!res.ok)
//         {
//             throw new Error(`Fetch failed with status ${res.status}`);
//         }

//         return await res.json() as LanguageJSON[];
//     }
// }

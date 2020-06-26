import { evaluations, contests, meals } from "../../../initial-firestore-data.json";

/**
 * TODO : handle images URLs ...
 */

const fakeUser = {
    name: "whatever, it's not used"
};

function mockAuth() {
    return {
        signInAnonymously: async () => {
            // throw error { code, message}
            return Promise.resolve();
        },

        onAuthStateChanged: (subscriber /* RxJS */) => {
            subscriber.next({
                ...fakeUser
            })
            return subscriber.unsubscribe;// TODO
        }
    };
}

class MealRef {    
    constructor(mealId) {
        this.meal = meals.find(meal => meal.id == mealId);
    }

    async get() {
        return {
            exists: !!this.meal,
            data: () => {
                return this.meal;
            }
        }
    }
}

class EvaluationsCollectionRef {
    constructor(documents) {
        this.documents = documents;
        this.searchDocId = undefined;
    }

    doc(itemId) {
        return new EvaluationsCollectionRef(this.documents.find(item => item.id == itemId));
    }

    where(field, operator, value) {
        // save this as where clause for get(), update()
        // we only support '==' operator
        if (operator !== "==") throw new Error("unsupported operator for where clauses in mock DB collection");
        let filteredData = this.documents.filter(item => {
            return item[field] == value;
        });    
        return new EvaluationsCollectionRef(filteredData);
    }

    async get() {
        if (Array.isArray(this.documents)) {
            const refs = this.documents.map(doc => {
                return {
                    id: doc.id,
                    data: () => doc,
                };
            });
            return Promise.resolve({
                empty: this.documents.length <= 0,
                docs: refs,
                forEach: (callbackFn) => {
                    return refs.forEach(callbackFn);
                }
            });
        } else {
            return Promise.resolve({
                exists: !!this.documents,
                // NOTE: not used yet...
                // data: async () => {
                //     return Promise.resolve(this.documents);
                // }
            });
        }
    }

    async update(whatToUpdate) {
        if (Array.isArray(this.documents)) {
            return Promise.reject("Not supported in this mock");
        } else {
            const found = evaluations.find(item => item.id == this.documents.id);

            // NOTE: I know that this mock will only ever update these 2 field...
            found.rating = whatToUpdate.rating;
            found.ratings = [...whatToUpdate.ratings];

            return Promise.resolve(true);
        }
    }

    async add(document) {
        // adds a new document to the collection.
        evaluations.push(document);

        return Promise.resolve(true);
    }
}

class ContestsCollectionRef {
    constructor(documents) {
        this.documents = documents;
    }
    
    async get() {
        return Promise.resolve({
            empty: this.documents.length <= 0,
            docs: this.documents.map( item => {
                return {
                    id: item.id,
                    data: () => {
                        const mealRefs = item.meals.map(meal => new MealRef(meal));
                        return {
                            ...item,
                            meals: mealRefs
                        };
                    }
                };
            })

        });
    }
}

function mockDB() {
    let collections = {
        "evaluations": new EvaluationsCollectionRef(evaluations),
        "contests": new ContestsCollectionRef(contests),
        //"meals": new Collection(),
    }

    return {
        collection: (name) => {
            return collections[name];
        }
    };
}

export const auth = mockAuth();
export const db = mockDB();

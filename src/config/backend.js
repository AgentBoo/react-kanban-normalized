import { v4 } from 'node-uuid'

const list_1 = v4().slice(0,8);
const list_2 = v4().slice(0,8);

// fake api response/fake db
export const db = {
  "lists": [
    {
      "id": list_1,
      "label": "Citruses",
      "cards": [
        {
          "id": v4().slice(0,12),
          "luid": list_1,
          "text": 'Grapefruit'
        },
        {
          "id": v4().slice(0,12),
          "luid": list_1,
          "text": 'Clementine'
        },
      ]
    },
    {
      "id": list_2,
      "label": "Berries",
      "cards": [
        {
          "id": v4().slice(0,12),
          "luid": list_2,
          "text": 'Raspberry'
        },
        {
          "id": v4().slice(0,12),
          "luid": list_2,
          "text": 'Cranberry'
        },
        {
          "id": v4().slice(0,12),
          "luid": list_2,
          "text": 'Lingonberry'
        },
        {
          "id": v4().slice(0,12),
          "luid": list_2,
          "text": 'Boysenberry'
        },
      ]
    }
  ],

// end
};


const delay = (ms) => new Promise(res => setTimeout(res, ms))

export const api = (endpoint, item) =>
  delay(200)
    .then(() => {
      switch(endpoint){
        case 'add/card':
          const add_card_res = {
            "id": v4().slice(0,12),
            "luid": item.luid,
            "text": item.text
          }
          db.lists.forEach((list) => list.id === item.luid ? list.cards.push(add_card_res) : list)
          return add_card_res

        case 'edit/card':
          let fromlist;
          let fromlistIdx;
          let tolistIdx;
          db.lists.forEach((list) => {
            if(list.id === item.luid){
              fromlistIdx = db.lists.indexOf(list)
              fromlist = list;
            } else if(list.id === item.to){
              tolistIdx = db.lists.indexOf(list)
            }
          });
          const editcard = fromlist.cards.filter((card) => card.id === item.id)[0]
          editcard.luid = item.to
          const cidx = fromlist.cards.indexOf(editcard)
          db.lists[fromlistIdx].cards.splice(cidx, 1)
          db.lists[tolistIdx].cards.push(editcard)
          return editcard

        case 'remove/card':
          const list = db.lists.filter((list) => list.id === item.luid)[0]
          const listIdx = db.lists.indexOf(list);
          const card = list.cards.filter((card) => card.id === item.id)[0]
          const cardIdx = list.cards.indexOf(card);
          db.lists[listIdx].cards.splice(cardIdx, 1)
          return db.lists[listIdx]

        case 'add/list':
          const addlist = {
            id: v4().slice(0,8),
            label: item.label,
            cards: []
          }
          db.lists.push(addlist)
          return addlist

        case 'remove/list':
          const removed = db.lists.filter((list) => list.id === item.id)[0]
          const removeIdx = db.lists.indexOf(removed)
          removed.cards.forEach((card) => {
            card.luid = db.lists[0].id
            db.lists[0].cards.push(card)
          })
          db.lists.splice(removeIdx, 1)
          return db.lists

        case 'edit/list':
          let edited = {}
          db.lists.forEach((list) => {
            if(list.id === item.id){
              list.label = item.label
              edited = {
                ...list,
                'label': item.label
              }
            }
          })
          return edited

        case 'destroy/all':
          db.lists = []
          return { 'lists': db.lists }

        case 'all':
        default:
          return { "lists": db.lists }
      }
    })

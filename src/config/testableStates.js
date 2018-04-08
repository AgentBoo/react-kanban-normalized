// NOTE: Proposed state
// ============================================================================ //
export const proposed = {
  cardlists : {
        collection : {
            "placeholder" : {
                id : "placeholder",
                label : "",
                prim: true,
                cards : []
            },
        },
        index : ["placeholder"]
  },
  cards : {
        collection : {},
        index : []
  },
};


// NOTE: State shapes for tests
// ============================================================================ //
// NOTE: Initial state
export const initial = {
  cardlists : {
        collection : {
            "l1" : {
                id : "l1",
                label : "List 1",
                cards : ["c1", "c2"]
            },
            "l2" : {
                id : "l2",
                label : "List 2",
                cards : ["c3"]
            }
        },
        index : ["l1", "l2"]
  },
  cards : {
        collection : {
            "c1" : {
                id : "c1",
                luid : "l1",
                status: "requested",
                text : ".....A",
            },
            "c2" : {
                id : "c2",
                luid : "l1",
                status: "requested",
                text : ".....B",
            },
            "c3" : {
                id : "c3",
                luid : "l2",
                status: "requested",
                text : ".....C",
            }
        },
        index : ["c1", "c2", "c3"]
  },
};

// NOTE: Move list
export const displace_list = {
  cardlists : {
        collection : {
            "l1" : {
                id : "l1",
                label : "List 1",
                cards : ["c1", "c2"]
            },
            "l2" : {
                id : "l2",
                label : "List 2",
                cards : ["c3"]
            }
        },
        index : ["l2", "l1"]
  },
  cards : {
        collection : {
            "c1" : {
                id : "c1",
                luid : "l1",
                status: "requested",
                text : ".....A",
            },
            "c2" : {
                id : "c2",
                luid : "l1",
                status: "requested",
                text : ".....B",
            },
            "c3" : {
                id : "c3",
                luid : "l2",
                status: "requested",
                text : ".....C",
            }
        },
        index : ["c1", "c2", "c3"]
  },
};

// NOTE: Move card in line
export const displace_card = {
  cardlists : {
        collection : {
            "l1" : {
                id : "l1",
                label : "List 1",
                cards : ["c2", "c1"]
            },
            "l2" : {
                id : "l2",
                label : "List 2",
                cards : ["c3"]
            }
        },
        index : ["l1", "l2"]
  },
  cards : {
        collection : {
            "c1" : {
                id : "c1",
                luid : "l1",
                status: "requested",
                text : ".....A",
            },
            "c2" : {
                id : "c2",
                luid : "l1",
                status: "requested",
                text : ".....B",
            },
            "c3" : {
                id : "c3",
                luid : "l2",
                status: "requested",
                text : ".....C",
            }
        },
        index : ["c1", "c2", "c3"]
  },
};

// NOTE: Move card across lines
export const transit_card = {
  cardlists : {
        collection : {
            "l1" : {
                id : "l1",
                label : "List 1",
                cards : ["c1"]
            },
            "l2" : {
                id : "l2",
                label : "List 2",
                cards : ["c2", "c3"]
            }
        },
        index : ["l1", "l2"]
  },
  cards : {
        collection : {
            "c1" : {
                id : "c1",
                luid : "l1",
                status: "requested",
                text : ".....A",
            },
            "c2" : {
                id : "c2",
                luid : "l2",
                status: "requested",
                text : ".....B",
            },
            "c3" : {
                id : "c3",
                // coordinate: 0,
                luid : "l2",
                status: "requested",
                text : ".....C",
            }
        },
        index : ["c1", "c2", "c3"]
  },
};

// NOTE: State after receiving initial data from api
export const normalized = {
  cardlists: {
    collection: {
      "01": {
        "id": "01",
        "coordinate": "0",
        "label": "Prospectives",
        "prim": true,
        "cards": ['001o0000009EPGK', '001o0000009EPM9']
      },
      "02": {
        "id": "02",
        "coordinate": "1",
        "label": "Scheduled A",
        "prim": false,
        "cards": ['001o000000GwJn5']
      },
      "03": {
        "id": "03",
        "coordinate": "0",
        "label": "Scheduled B",
        "prim": false,
        "cards": []
      }
    },
    index: ["01", "02", "03"]
  },
  cards: {
    collection: {
      '001o0000009EPGK': {
        "id": '001o0000009EPGK',
        "coordinate": "0",
        "luid": "01",
        "account":  '001o0000009EPGK',
        "acc_rcd_type": "household",
        "engagement": "Hot",
        "history": "$19,744.50",
        "status": "suggested",
      },
      '001o0000009EPM9': {
        "id": '001o0000009EPM9',
        "coordinate": "1",
        "luid": "01",
        "account": '001o0000009EPM9',
        "acc_rcd_type": "household",
        "engagement": "Hot",
        "history": "$29,543.74",
        "status": "suggested",
      },
      '001o000000GwJn5':   {
          "id": '001o000000GwJn5',
          "coordinate": "0",
          "luid": "02",
          "account":  '001o000000GwJn5',
          "acc_rcd_type": "household",
          "engagement": "Warm",
          "history": "$5,500.00",
          "status": "requested",
        }
    },
    index: ['001o0000009EPGK', '001o0000009EPM9', '001o000000GwJn5']
  }
}

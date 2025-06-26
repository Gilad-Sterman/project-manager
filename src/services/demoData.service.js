export const staff = [
    {
        "_id": "s101",
        "fName": "אור",
        "lName": "כהן",
        "createdAt": "2025-03-26"
    },
    {
        "_id": "s102",
        "fName": "דנה",
        "lName": "לוי",
        "createdAt": "2025-04-25"
    },
    {
        "_id": "s103",
        "fName": "יואב",
        "lName": "פרידמן",
        "createdAt": "2025-05-10"
    },
    {
        "_id": "s104",
        "fName": "רועי",
        "lName": "שטרן",
        "createdAt": "2025-05-25"
    },
    {
        "_id": "s105",
        "fName": "מאיה",
        "lName": "בן חיים",
        "createdAt": "2025-06-04"
    },
    {
        "_id": "s106",
        "fName": "גילי",
        "lName": "נחום",
        "createdAt": "2025-06-14"
    }
];

export const items = [
    {
        "_id": "i101",
        "name": "אפוד קרבי",
        "type": "ציוד מגן",
        "division": "לוחמה",
        "quantity": 40
    },
    {
        "_id": "i102",
        "name": "קסדה טקטית",
        "type": "ציוד מגן",
        "division": "לוחמה",
        "quantity": 35
    },
    {
        "_id": "i103",
        "name": "ערכת עזרה ראשונה",
        "type": "ציוד רפואי",
        "division": "חיל רפואה",
        "quantity": 20
    },
    {
        "_id": "i104",
        "name": "תחמושת 5.56",
        "type": "תחמושת",
        "division": "חימוש",
        "quantity": 1000
    },
    {
        "_id": "i105",
        "name": "אמצעי קשר",
        "type": "ציוד תקשורת",
        "division": "קשר",
        "quantity": 15
    },
    {
        "_id": "i106",
        "name": "שק שינה",
        "type": "ציוד שטח",
        "division": "לוגיסטיקה",
        "quantity": 50
    }
];

export const boards = [
    {
        "_id": "b001",
        "name": "פרויקט שדרוג תקשוב",
        "description": "לוח ניהול פרויקט מספר 1",
        "createdAt": "2025-05-27",
        "deadline": "2025-07-10",
        "completionDate": "",
        "tasks": [
            {
                "_id": "t010",
                "name": "משימה 10",
                "description": "תיאור של משימה מספר 10",
                "createdAt": "2025-05-27",
                "deadline": "2025-07-03",
                "stage": "waiting",
                "teamMembers": [
                    "s102",
                    "s104"
                ],
                "items": [
                    "i105"
                ]
            },
            {
                "_id": "t011",
                "name": "משימה 11",
                "description": "תיאור של משימה מספר 11",
                "createdAt": "2025-06-05",
                "deadline": "2025-07-02",
                "stage": "done",
                "teamMembers": [
                    "s103",
                    "s105"
                ],
                "items": []
            },
            {
                "_id": "t012",
                "name": "משימה 12",
                "description": "תיאור של משימה מספר 12",
                "createdAt": "2025-06-11",
                "deadline": "2025-06-25",
                "stage": "inProgress",
                "teamMembers": [
                    "s106",
                    "s105"
                ],
                "items": [
                    "i102",
                    "i106"
                ]
            },
            {
                "_id": "t013",
                "name": "משימה 13",
                "description": "תיאור של משימה מספר 13",
                "createdAt": "2025-06-03",
                "deadline": "2025-07-01",
                "stage": "inProgress",
                "teamMembers": [
                    "s106"
                ],
                "items": [
                    "i106",
                    "i104"
                ]
            },
            {
                "_id": "t014",
                "name": "משימה 14",
                "description": "תיאור של משימה מספר 14",
                "createdAt": "2025-06-07",
                "deadline": "2025-07-03",
                "stage": "done",
                "teamMembers": [
                    "s105"
                ],
                "items": [
                    "i103",
                    "i102"
                ]
            }
        ],
        "stage": "inProgress",
        "manager": {
            "_id": "s102",
            "fName": "דנה",
            "lName": "לוי",
            "createdAt": "2025-04-25"
        },
        "requestedBy": "מפקדה אזורית",
        "staffMembers": [
            "s103",
            "s105"
        ],
        "items": [
            "i103",
            "i105",
            "i102"
        ]
    },
    {
        "_id": "b002",
        "name": "היערכות חירום 2025",
        "description": "לוח ניהול פרויקט מספר 2",
        "createdAt": "2025-05-08",
        "deadline": "2025-07-11",
        "completionDate": "",
        "tasks": [
            {
                "_id": "t020",
                "name": "משימה 20",
                "description": "תיאור של משימה מספר 20",
                "createdAt": "2025-05-31",
                "deadline": "2025-07-02",
                "stage": "done",
                "teamMembers": [
                    "s106",
                    "s102",
                    "s104"
                ],
                "items": [
                    "i102",
                    "i106"
                ]
            },
            {
                "_id": "t021",
                "name": "משימה 21",
                "description": "תיאור של משימה מספר 21",
                "createdAt": "2025-06-01",
                "deadline": "2025-06-30",
                "stage": "waiting",
                "teamMembers": [
                    "s102",
                    "s101"
                ],
                "items": []
            },
            {
                "_id": "t022",
                "name": "משימה 22",
                "description": "תיאור של משימה מספר 22",
                "createdAt": "2025-05-30",
                "deadline": "2025-06-27",
                "stage": "done",
                "teamMembers": [
                    "s103",
                    "s102",
                    "s101"
                ],
                "items": [
                    "i104",
                    "i105"
                ]
            },
            {
                "_id": "t023",
                "name": "משימה 23",
                "description": "תיאור של משימה מספר 23",
                "createdAt": "2025-06-14",
                "deadline": "2025-07-02",
                "stage": "waiting",
                "teamMembers": [
                    "s103",
                    "s106"
                ],
                "items": [
                    "i101",
                    "i103"
                ]
            },
            {
                "_id": "t024",
                "name": "משימה 24",
                "description": "תיאור של משימה מספר 24",
                "createdAt": "2025-06-13",
                "deadline": "2025-06-27",
                "stage": "done",
                "teamMembers": [
                    "s103",
                    "s101",
                    "s105"
                ],
                "items": [
                    "i105",
                    "i104"
                ]
            }
        ],
        "stage": "inProgress",
        "manager": {
            "_id": "s101",
            "fName": "אור",
            "lName": "כהן",
            "createdAt": "2025-03-26"
        },
        "requestedBy": "מפקדה אזורית",
        "staffMembers": [
            "s106",
            "s101"
        ],
        "items": [
            "i105",
            "i102"
        ]
    },
    {
        "_id": "b003",
        "name": "מבצע רמות שקטות",
        "description": "לוח ניהול פרויקט מספר 3",
        "createdAt": "2025-05-23",
        "deadline": "2025-07-07",
        "completionDate": "",
        "tasks": [
            {
                "_id": "t030",
                "name": "משימה 30",
                "description": "תיאור של משימה מספר 30",
                "createdAt": "2025-06-04",
                "deadline": "2025-06-30",
                "stage": "done",
                "teamMembers": [
                    "s102",
                    "s101"
                ],
                "items": []
            },
            {
                "_id": "t031",
                "name": "משימה 31",
                "description": "תיאור של משימה מספר 31",
                "createdAt": "2025-05-26",
                "deadline": "2025-06-26",
                "stage": "waiting",
                "teamMembers": [
                    "s106",
                    "s102"
                ],
                "items": []
            },
            {
                "_id": "t032",
                "name": "משימה 32",
                "description": "תיאור של משימה מספר 32",
                "createdAt": "2025-06-02",
                "deadline": "2025-06-25",
                "stage": "inProgress",
                "teamMembers": [
                    "s101"
                ],
                "items": []
            },
            {
                "_id": "t033",
                "name": "משימה 33",
                "description": "תיאור של משימה מספר 33",
                "createdAt": "2025-06-06",
                "deadline": "2025-06-25",
                "stage": "waiting",
                "teamMembers": [
                    "s102"
                ],
                "items": [
                    "i102"
                ]
            },
            {
                "_id": "t034",
                "name": "משימה 34",
                "description": "תיאור של משימה מספר 34",
                "createdAt": "2025-06-02",
                "deadline": "2025-06-25",
                "stage": "inProgress",
                "teamMembers": [
                    "s106"
                ],
                "items": [
                    "i102",
                    "i105"
                ]
            }
        ],
        "stage": "waiting",
        "manager": {
            "_id": "s103",
            "fName": "יואב",
            "lName": "פרידמן",
            "createdAt": "2025-05-10"
        },
        "requestedBy": "מפקדה אזורית",
        "staffMembers": [
            "s105",
            "s103"
        ],
        "items": [
            "i105",
            "i102"
        ]
    },
    {
        "_id": "b004",
        "name": "פריסת מערך לוגיסטי דרומי",
        "description": "לוח ניהול פרויקט מספר 4",
        "createdAt": "2025-05-24",
        "deadline": "2025-07-04",
        "completionDate": "2025-06-23",
        "tasks": [
            {
                "_id": "t040",
                "name": "משימה 40",
                "description": "תיאור של משימה מספר 40",
                "createdAt": "2025-05-28",
                "deadline": "2025-06-27",
                "stage": "done",
                "teamMembers": [
                    "s101"
                ],
                "items": []
            },
            {
                "_id": "t041",
                "name": "משימה 41",
                "description": "תיאור של משימה מספר 41",
                "createdAt": "2025-06-01",
                "deadline": "2025-06-29",
                "stage": "waiting",
                "teamMembers": [
                    "s106",
                    "s105",
                    "s102"
                ],
                "items": [
                    "i102"
                ]
            },
            {
                "_id": "t042",
                "name": "משימה 42",
                "description": "תיאור של משימה מספר 42",
                "createdAt": "2025-06-10",
                "deadline": "2025-06-29",
                "stage": "waiting",
                "teamMembers": [
                    "s104"
                ],
                "items": [
                    "i103",
                    "i102"
                ]
            },
            {
                "_id": "t043",
                "name": "משימה 43",
                "description": "תיאור של משימה מספר 43",
                "createdAt": "2025-05-26",
                "deadline": "2025-06-29",
                "stage": "waiting",
                "teamMembers": [
                    "s103",
                    "s105",
                    "s106"
                ],
                "items": [
                    "i103"
                ]
            },
            {
                "_id": "t044",
                "name": "משימה 44",
                "description": "תיאור של משימה מספר 44",
                "createdAt": "2025-06-06",
                "deadline": "2025-06-30",
                "stage": "done",
                "teamMembers": [
                    "s105"
                ],
                "items": []
            }
        ],
        "stage": "done",
        "manager": {
            "_id": "s104",
            "fName": "רועי",
            "lName": "שטרן",
            "createdAt": "2025-05-25"
        },
        "requestedBy": "מפקדה אזורית",
        "staffMembers": [
            "s105",
            "s102",
            "s101"
        ],
        "items": [
            "i103",
            "i105"
        ]
    },
    {
        "_id": "b005",
        "name": "לוח 5",
        "description": "לוח ניהול פרויקט מספר 5",
        "createdAt": "2025-05-13",
        "deadline": "2025-07-09",
        "completionDate": "2025-06-23",
        "tasks": [
            {
                "_id": "t050",
                "name": "משימה 50",
                "description": "תיאור של משימה מספר 50",
                "createdAt": "2025-06-14",
                "deadline": "2025-06-27",
                "stage": "inProgress",
                "teamMembers": [
                    "s105"
                ],
                "items": [
                    "i102"
                ]
            },
            {
                "_id": "t051",
                "name": "משימה 51",
                "description": "תיאור של משימה מספר 51",
                "createdAt": "2025-05-25",
                "deadline": "2025-07-04",
                "stage": "inProgress",
                "teamMembers": [
                    "s102"
                ],
                "items": []
            },
            {
                "_id": "t052",
                "name": "משימה 52",
                "description": "תיאור של משימה מספר 52",
                "createdAt": "2025-06-18",
                "deadline": "2025-06-30",
                "stage": "waiting",
                "teamMembers": [
                    "s102",
                    "s101",
                    "s105"
                ],
                "items": []
            },
            {
                "_id": "t053",
                "name": "משימה 53",
                "description": "תיאור של משימה מספר 53",
                "createdAt": "2025-05-30",
                "deadline": "2025-07-01",
                "stage": "waiting",
                "teamMembers": [
                    "s104",
                    "s105"
                ],
                "items": []
            },
            {
                "_id": "t054",
                "name": "משימה 54",
                "description": "תיאור של משימה מספר 54",
                "createdAt": "2025-05-25",
                "deadline": "2025-07-03",
                "stage": "done",
                "teamMembers": [
                    "s101",
                    "s103"
                ],
                "items": [
                    "i101"
                ]
            }
        ],
        "stage": "done",
        "manager": {
            "_id": "s104",
            "fName": "רועי",
            "lName": "שטרן",
            "createdAt": "2025-05-25"
        },
        "requestedBy": "מפקדה אזורית",
        "staffMembers": [
            "s102",
            "s104",
            "s105",
            "s101"
        ],
        "items": [
            "i102",
            "i103",
            "i101"
        ]
    }
];

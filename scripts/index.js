// Kennel Enrichment Log

// var Animals =
// [   {   UniqueID: "1001",
//         Name: "Geronimo",
//         Active: true,
//         Color: "B",
//         Cage: 32
//     },
//     {   UniqueID: "1002",
//         Name: "Buddy",
//         Active: true,
//         Color: "G",
//         Cage: 32
//     },
//     {   UniqueID: "1003",
//         Name: "KeKe",
//         Active: true,
//         Color: "BK",
//         Cage: 32
//     },
//     {   UniqueID: "1004",
//         Name: "Genie",
//         Active: true,
//         Color: "P",
//         Cage: 32
//     },
//     {   UniqueID: "1005",
//         Name: "Darwin",
//         Active: true,
//         Color: "P",
//         Cage: 32
//     },
//     {   UniqueID: "1006",
//         Name: "Buddy",
//         Active: true,
//         Color: "B",
//         Cage: 32
//     },
//     {   UniqueID: "1007",
//         Name: "Sissy",
//         Active: true,
//         Color: "R",
//         Cage: 32
//     },
//     {   UniqueID: "1008",
//         Name: "Lady Jane",
//         Active: true,
//         Color: "P",
//         Cage: 32
//     },
//     {   UniqueID: "1009",
//         Name: "Jackson",
//         Active: true,
//         Color: "B",
//         Cage: 32
//     },
//     {   UniqueID: "1010",
//         Name: "Bocephus",
//         Active: true,
//         Color: "B",
//         Cage: 32
//     },
//     {   UniqueID: "1011",
//         Name: "China",
//         Active: true,
//         Color: "O",
//         Cage: 32
//     },
//     {   UniqueID: "1012",
//         Name: "Pretty Boy",
//         Active: true,
//         Color: "O",
//         Cage: 32
//     },
// ]

function enrichmentTable (data)
{   // This function is only used to temporarilly mock up an enrichment log.  Once the page is interacting
    // with Firebase, there will be no need for this function

    if (data.Active)
    {   // but only if this animal is "active"

        var animalDiv = $("<div>");

        var nameDiv = $("<div>");
        nameDiv
            .addClass("et-name")
            .text (data.Name);

        var colorDiv = $("<div>");
        colorDiv
            .addClass("et-color")
            .text (data.Color);
            
        var cageDiv = $("<div>");
        cageDiv
            .addClass("et-cage")
            .text ("--");
                
        animalDiv
            .append(nameDiv)
            .append(colorDiv)
            .append(cageDiv);
            
        for (var i=0; i<28; i++)
        {   var insideDiv = $("<div>");
            insideDiv
                .addClass("et-day-inside")
                .text("x");

            var weekClass = "week-four";

            if (i < 21) weekClass = "week-three";
            if (i < 14) weekClass = "week-two";
            if (i < 7) weekClass = "week-one";
        
            var detailDiv = $("<div>");
            detailDiv
                .addClass("et-day " + weekClass)
                .append(insideDiv);
            
            animalDiv.append(detailDiv);
        }
            
        var colorClass = "";

        switch (data.Color)
        {   case "B":
            {   colorClass = "blue-theme";
                break;
            }
            case "G":
            {   colorClass = "green-theme";
                break;
            }
            case "O":
            {   colorClass = "orange-theme";
                break;
            }
            case "P":
            {   colorClass = "purple-theme";
                break;
            }
            case "R":
            {   colorClass = "red-theme";
                break;
            }
            default:
            {   colorClass = "black-theme";
                break;
            }
        }

        animalDiv
            .addClass ("animal-row " + colorClass);
            
        $("#enrichment-table")
            .append(animalDiv);
    }
}

$(document).ready(function()
{   // Initialize Firebase

    var config =
    {   apiKey: "AIzaSyAc7R3hYu0vaODV_M36ZfWs3JKugR-IeOE",
        authDomain: "kennel-log.firebaseapp.com",
        databaseURL: "https://kennel-log.firebaseio.com",
        projectId: "kennel-log",
        storageBucket: "kennel-log.appspot.com",
        messagingSenderId: "159110224354"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

//     Animals.forEach(function(data)
//     {   // Get initial test data into Firebase
// 
//         var UniqueID = data.UniqueID;
// 
//         database.ref("AnimalMaster" + "/" + data.UniqueID).set(
//         {   Active: true,
//             Name: data.Name,
//             Color: data.Color,
//             Cage: Math.floor(Math.random() * 100)
//         });
// 
// // Let's save this for the next step...right now lets populate the AnimalMaster key.
// //         for (var i=0; i<28; i++)
// //         {   
// //             database.ref("/ActivityRecord").set(
// //             {
// // 
// //             });
// //         }
// //     });
//     });

    database.ref("AnimalMaster").on("child_added", function(snap)
    {   if (snap.val() != undefined)
        {   
console.log("AnimalMaster.on()");
console.log(snap.val());
            enrichmentTable (snap.val());
            var children = snap.numChildren();
console.log(children);

//             for (i=0; i<28; i++)
//             {
// console.log("children: ", children);
//                 if (Math.random() < .5)
//                 {   // for now a 50/50 chance that each dog was walked on any given day
//                     database.ref("ActivtyLog/" + snap.val().UniqueID + "/" + i).set(
//                     {   Walked: true
//                     })
//                 }
//             }
        }
    });
})
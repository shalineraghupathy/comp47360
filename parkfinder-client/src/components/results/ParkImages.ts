    const parkImages: { [key: string]: string } = {
    "Central Park": "/staticparkimages/centralp.jpeg",
    "Bryant Park": "/staticparkimages/bryantp.jpeg",
    "The High Line": "/staticparkimages/highline.jpg",
    "Washington Square Park": "/staticparkimages/washington.jpg",
    "Saint Vartan Park": "/staticparkimages/saintvartan.jpg",
    "Tompkins Square Park": "/staticparkimages/tompkinssquare.jpg",
    "DeWitt Clinton Park": "/staticparkimages/dewittclinton.jpg",
    "Pershing Square": "/staticparkimages/pershingsquare.jpg",
    "Pier 84": "/staticparkimages/pier84.jpg",
    "Riverside Park": "/staticparkimages/riversidepark.jpg",
    "Riverside Park South": "/staticparkimages/riversidesouth.jpg",
    "Riverwalk Commons": "/staticparkimages/riverwalkcommons.jpg",
    "Madison Square Park": "/staticparkimages/madisonsquare.jpg",
    "Union Square Park": "/staticparkimages/unionsquare.jpg",
    "United Nations Garden": "/staticparkimages/unitednations.jpg",
    "Chelsea Waterside Park": "/staticparkimages/chelseawaterside.jpg",
    "Grand Army Plaza": "/staticparkimages/grandarmy.jpg",
    "Bellevue South Park": "/staticparkimages/bellevuesouth.jpg",
    "Bella Abzug Park": "/staticparkimages/bellaabzug.jpg",
    "Verdi Square": "/staticparkimages/verdisquare.jpg",
    "Joan of Arc Park": "/staticparkimages/joanofarc.jpg",
    "John Jay Park": "/staticparkimages/johnjay.jpg",
    "James J Walker Park": "/staticparkimages/jamesj.jpg",
    "St. Catherine's Park": "/staticparkimages/stcatherines.jpg",
    "405-425 Main St, New York, NY 10044, USA": "/staticparkimages/405.jpg",
    "Fort Washington Park": "/staticparkimages/fortwashington.jpg",
    "Irish Hunger Memorial": "/staticparkimages/irishhunger.jpg",
    "Jackie Robinson Park": "/staticparkimages/jackierobinson.jpg",
    "James Madison Park": "/staticparkimages/jamesmadison.jpg",
    "LentSpace": "/staticparkimages/lentspace.jpg",
    "Low Plaza": "/staticparkimages/lowplaza.jpg",
    "Lower East Side Playground": "/staticparkimages/lowereast.jpg",
    "Nelson A. Rockefeller": "/staticparkimages/rockefeller.jpg",
    "Pier 25": "/staticparkimages/pier25.jpg",
    "Sara D. Roosevelt Park": "/staticparkimages/sarad.jpg",
    "Seward Park": "/staticparkimages/sewardpark.jpg",
    "Teardrop Park": "/staticparkimages/teardrop.jpg",
    "The Esplanade": "/staticparkimages/esplanade.jpg",
    "Tudor City Greens - North Park": "/staticparkimages/tudorcity.jpg",
    "Washington Market Park": "/staticparkimages/washingtonmarket.jpg",
    "West Thames Park": "/staticparkimages/westthames.jpg",
    "Battery Park": "/staticparkimages/batterypark.jpg",
    "Coleman Playground": "/staticparkimages/colemanplayground.jpg",
    "Columbus Park": "/staticparkimages/columbuspark.jpg",
    "Hudson River Park": "/staticparkimages/hudsonriver.jpg",
    "Gramercy Park": "/staticparkimages/gramercypark.jpg",
    "Peter's Field": "/staticparkimages/petersfield.jpg",
    "Stuyvesant Square": "/staticparkimages/stuyvesantsquare.jpg",
    "Penn South Playground": "/staticparkimages/pennsouth.jpg",
    "Asser Levy Playground": "/staticparkimages/asserlevy.jpg",
    "Dr. Gertrude B. Kelly Playground": "/staticparkimages/dr.gertrude.jpg",
    "Chelsea Park": "/staticparkimages/chelseapark.jpg",
    "Stuyvesant Cove Park": "/staticparkimages/stuyvesantcove.jpg",
    "Cooper Triangle": "/staticparkimages/coopertriangle.jpg",
    "Playground 11": "/staticparkimages/playground11.jpg",
    "Clement Clarke Moore Park": "/staticparkimages/clementclarke.jpg",
    "Tudor City Greens - South Park": "/staticparkimages/tudorcity.jpg",
    "Robert Moses Playground": "/staticparkimages/robertmoses.jpg",
    "Murphy Brothers Playground": "/staticparkimages/murphybrothers.jpg",
    "14th Street Park": "/staticparkimages/14thstreet.jpg",
    "Public Square and Gardens": "/staticparkimages/publicsquare.jpg",
    "Dag Hammarskjold Plaza": "/staticparkimages/dag.jpg",
    "Little Island": "/staticparkimages/littleisland.jpg",
    "McKinley Playground": "/staticparkimages/mckinley.jpg",
    "Gansevoort Peninsula": "/staticparkimages/gansevoortpeninsula.jpg",
    "First Park": "/staticparkimages/firstpark.jpg",
    "Dry Dock Playground": "/staticparkimages/drydock.jpg",
    "Elizabeth Street Garden": "/staticparkimages/elizabethstreet.jpg",
    "John V. Lindsay East River Park": "/staticparkimages/johnvlindsay.jpg",
    "Peter Detmold Park": "/staticparkimages/peterdetmold.jpg",
    "Pier 45": "/staticparkimages/pier45.jpg",
    "Hells Kitchen Park": "/staticparkimages/hellskitchen.jpg",
    "FDR Four Freedoms State Park": "/staticparkimages/fdrfour.jpg",
    "Pier 76": "/staticparkimages/pier76.jpg",
    "Hamilton Fish Park": "/staticparkimages/hamiltonfish.jpg",
    "Southpoint Park": "/staticparkimages/southpointpark.jpg",
    "Canal Park": "/staticparkimages/canalpark.jpg",
    "Sutton Parks": "/staticparkimages/suttonparks.jpg",
    "Albert Capsouto Park": "/staticparkimages/albertcapsuoto.jpg",
    "Seward Park Extension Park": "/staticparkimages/sewardpark.jpg",
    "Seward Park High School - Community Playground": "/staticparkimages/sewardpark.jpg",
    "Luther Gulick Playground": "/staticparkimages/luthergulick.jpg",
    "Queensborough Oval": "/staticparkimages/queensboroughoval.jpg",
    "Hillman Park": "/staticparkimages/hillman.jpg",
    "Twentyfour Sycamores Park": "/staticparkimages/twentyfour.jpg",
    "Sol Lain Playground": "/staticparkimages/sollain.jpg",
    "Collect Pond Park": "/staticparkimages/collectpond.jpg",
    "Andrew Haswell Green Park": "/staticparkimages/andrewhaswell.jpg",
    "Liberty Park": "/staticparkimages/libertypark.jpg",
    "Henry M. Jackson Playground": "/staticparkimages/henrym.jpg",
    "Robert Moses Plaza": "/staticparkimages/robertmoses.jpg",
    "St. Peter's Garden": "/staticparkimages/stpeters.jpg",
    "Clinton Cove": "/staticparkimagesclintoncove.jpg",
    "Pier 26": "/staticparkimages/pier26.jpg",
    "Thomas Paine Park": "/staticparkimages/thomaspaine.jpg",
    "Vladeck Park": "/staticparkimages/vladeckpark.jpg",
    "Damrosch Park": "/staticparkimages/damroschpark.jpg",
    "Corlears Hook Park": "/staticparkimages/corlearshook.jpg",
    "Playground One": "/staticparkimages/playgroundone.jpg",
    "Samuel N. Bennerson 2nd Playground": "/staticparkimages/samueln.jpg",
    "City Hall Park": "/staticparkimages/cityhall.jpg",
    "Pier 42 Upland Park": "/staticparkimages/pier42.jpg",
    "James Madison Plaza": "/staticparkimages/jamesmadison.jpg",
    "Pier 42 Deck": "/staticparkimages/pier42.jpg",
    "Alfred E. Smith Playground": "/staticparkimages/alfrede.jpg",
    "Tanahey Playground": "/staticparkimages/tanahey.jpg",
    "Brooklyn Banks": "/staticparkimages/brooklynbanks.jpg",
    "Catherine Slip Malls": "/staticparkimages/catherineslip.jpg",
    "Drumgoole Plaza": "/staticparkimages/drumgooleplaza.jpg",
    "The Elevated Acre": "/staticparkimages/elevatedacre.jpg",
    "Vietnam Veterans Plaza": "/staticparkimages/vietnamveterans.jpg",
    "East River Waterfront Esplanade": "/staticparkimages/eastriver.jpg",
    "South Cove Park": "/staticparkimages/southcove.jpg",
    "Bowling Green": "/staticparkimages/bowlinggreen.jpg",
    "Wagner Park": "/staticparkimages/wagnerpark.jpg",
    "Mannahatta Park": "/staticparkimages/mannahattapark.jpg",
    "Elizabeth H. Berger Plaza": "/staticparkimages/elizabethh.jpg",
    "Rector Park": "/staticparkimages/rectorpark.jpg",
    "Zuccotti Park": "/staticparkimages/zuccottipark.jpg",
    "North End Dog Run, Liberty Green, 300 North End Ave, New York, NY 10282, USA": "/staticparkimages/northend.jpg",
    "Nelson A. Rockefeller Park": "/staticparkimages/nelsona.jpg",
    "William E. Passannante Ballfield": "/staticparkimages/williame.jpg",
    "Corporal John A. Seravalli Playground": "/staticparkimages/corporaljohn.jpg",
    "Ruppert Park": "/staticparkimages/ruppertpark.jpg",
    "Tecumseh Playground": "/staticparkimages/tecumsehplayground.jpg",
    "Theodore Roosevelt Park": "/staticparkimages/theodoreroosevelt.jpg",
    "Carl Schurz Park": "/staticparkimages/carlschurz.jpg",
    // "": "/staticparkimages/.jpg",
    // "": "/staticparkimages/.jpg",
    // "": "/staticparkimages/.jpg",







  };

  export default parkImages;
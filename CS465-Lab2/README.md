# Lab 2: Oh, The Places You've Been!

---

- Your Name: Matt Eagan
- GitHub Username: MEaganEagan
- Repository URL: https://github.com/MEaganEagan/CS465-Lab2
- Date Submitted: 2025-10-14
- Collaborators: Charles C. Palmer [Instructor]
- Comments: The completed assignment's functionality includes:
                * A dynamic map that can resize and displays well on mobile devices
                * Markers created by double-clicking anywehre on the map (double-tapping on mobile)
                * The ability to delete markers by right-clicking (multi-touching on mobile)
                * The ability to edit created markers by double-clicking on a marker (double-tapping on mobile) [EXTRA]
                * The ability to move created markers by clicking and dragging [EXTRA]
                * An expandible list of all markers that a user creates [EXTRA]
                * A buttton that removes all created markers at once
            
            Various jsx tips and knowledge surrounding functions was adopted from a Southern New Hampshire University Lecture hosted by Charles C. Palmer
            Leaflet Map styling functions were sourced from the Open-Source Leaflet docs: https://leafletjs.com/reference.html
            Leaflet container and map functionality setup sourced from this examples in this repository by GitHub user ms-aija: https://github.com/ms-aija/LeafletReact5minDemo?tab=readme-ov-file

    # WHAT WORKED
            Setting the map up in my project came very quickly and I am pleased with the functionality and the customization of controls I accomplished.
            The controls for creating and modifying markers on the map were kept very simple and the user interface appears very lightweight and effective
            Iterating through the marker objects and indexing came very easily following in-class lectures on jsx as well as my previous courses in data structures.
    # WHAT DIDN'T WORK
            The z-index of the map container defaults to a strange value, causing any UI elements I drew to appear behind the map container. A large chunk of my development time was sunk into resolving this issue.
            As this is the first Vite project I have launched on render.com, I ran into some trouble deploying my site. Render was searching in the \src directory for the package.json file, despite it appearing in the root directory. I additionally had to modify and re-commit my project as the Gitignore prevented Render from seeing the \dist directory.
            Despite appearing correct on my local project, upon deploying my site, the markers on the map do not correctly load their icons. Potentially clearing the build cache and re-deploying could remedy this, despite all other functionality working correctly.

            If I had more time before the deadline for this project I would have considered:
                * Adding animations to the retractible list
                * Allowing users to customize icons or upload images for each marker they create
                * Changed the map tile layer to a satellite rather than the current road-map tiles
                * Included a header with a fancy logo that can adapt to mobile devices

I maintain that all code submitted to this project was solely wrote by me to the best of my current ability and knowledge.

---
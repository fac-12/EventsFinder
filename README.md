# EventsFinder

A site to find and add events of interest to the FAC community (with a 1990s web design aesthetic)

## User Stories/Site features

### Implemented

- User can search for events by date range, by host or by any combination of the above. No fields are required, but the default start date is the current date.
- Results show the first 15 events matching the search criteria, sorted by date.
- The page loads the next fifteen events by default upon initial load.
- Hosts field has a datalist prepopulated from the database of all existing hosts.
- The user can see how many people have indicated interest in an event (this draws from pre-populated sample data in attendance table. It cannot yet be edited as we have not yet added ability for user to indicate interest).

### Planned

- User asked to log in
- User can see events they have expressed interest in attending
- User can see identity of other users who have indicated interest in a particular event
- User can comment on events and view others' comments

## Database & Queries

- We have four tables: events (information about events), users (information about users), attendance (many-to-many join table indicating if user has expressed interest in an event), comments (information about comments). Only the events table can be edited currently bc we have not yet implemented all functionality.
- Upon loading, there are two queries run: 
    - getHosts fetches all hosts in the database
    - searchWithoutHost pulls all search results
TO BE CONTINUED

**Initial Database Schema**

## Outstanding Issues

- Error handling (show message when server error happens)
- Confirmation message when event added
- Prevent repeat events from being entered

- Lots of CSS

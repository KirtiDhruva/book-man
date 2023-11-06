# Book-Man

    Version: 1.0.0
    Author: Kirti Dhruva
    Description: A simple CRUD demo using Node.js, Express.js, Mongoose & MongoDB

    Assumptions:
        1. Delete a book actually hard-deletes a book. In an actual real world project this will more often than not just a soft-delete i.e. the resource is just marked deleted.

## Quick Start Guide

## API URL: http://bookman.techavngel.in/

## API documentation

1. Get all books:
   method : GET
   url : {BASE_URL}/api/v1/library/all

2. Get a single book by id:
   method : GET
   url : {BASE_URL}/api/v1/library/:id

3. Add a book:
   method : POST
   url : {BASE_URL}/api/v1/library/add

4. Update a book:
   method : PATCH
   url : {BASE_URL}/api/v1/library/update/:id

5. Delete a book:
   method : DELETE
   url : {BASE_URL}/api/v1/library/:id

6. Delete all book:
   method : DELETE
   url : {BASE_URL}/api/v1/library/all

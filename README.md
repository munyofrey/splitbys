# Splitbys

[Splitbys live][heroku]

[heroku]:http://splitbys.herokuapp.com

Splitbys is a full-stack inspired by Splitwise. It relies on Ruby on Rails for the backend, PostgreSQL for the database, and React.js with a Redux framework for the frontend. Splitbys is a single-page application, all content is rendered on one static page. Sensitive client information is kept out of the frontend by only allowing view access if `SessionStore#currentUser` is not null.  

##Features and Implementation


### Bills

Bills can be created, viewed, edited and deleted. In the database the following columns are stored `user_owe_id`, `user_pay_id`, `date`, `total`, `owed`, `description` and `note`. On the front end Bills are kept in the `BillsStore`,
on login an api call is made to the `BillsController#index` to receive all bills a user shares. Bills update in the store when a user creates, updates or deletes a bill or when they navigate to a friends history page at which point an api call to `FriendsController#show` occurs.

```ruby
def show
  @bills = current_user.all_bills_for_friend(params[:id])
  render json: @bills
end
```

`User#all_bills_for_friend` makes a SQL query to the database and returns all bills between friends organized by transaction date.

Any bill can be commented on by the ower or payer. Comments are stored nested under individual bills in the `BillStore`. When a comment is created or deleted the `BillStore` is updated but other bill information is not refetched. The `comments` table in the database stores `body`, `bill_id`, `user_id`.

![BillDetail]
![CommentsCrop]

Comments can be created and deleted. If a user is the author of a comment they need only click the X to the right of their comment.



### Totals

Splitbys gives clients a running tally of money owed to them and by them between friends. When a client navigates to the totals page a call to `SumsController#index` is made and the `SumsStore` is updated.

```ruby
class Api::SumsController < ApplicationController

  def index
    @user = current_user
    @totals = current_user.sums
    render json: @totals
  end

end
```
Here `User#sums` makes a SQL query and returns an array of two arrays that represent money owed to a user and owed from. Sums are displayed in different columns depending on if the user is in debt with a friend or can collect.

![sums]

Each total item links to the corresponding friend, allowing an easy way to review transaction history between friends.

![smallSum]

### Friends

Splitbys allows users to search the database of people they may know, and to search their friends for people to create bills with. In the case of the new friend user search a call to `UsersController#index` is made, which returns a list of all users the client is not already friends (including pending friend requests). The users are stored in the `UserStore` and as the client types are filtered alphabetically. When a user tries to add another user as a friend a request is sent to the other user which they can approve or delete.

![FriendSearch]
![FriendSearchDropdown]
![friendIndex]

The `FriendStore` stores three types of friend relationships - pending requests from the current user, requests to the current user and friends. The database holds three pertinent pieces of information `user_one_id`, `user_two_id` and the boolean `pending`. When a user requests a friend or approves a request a api call is made to `FriendsController#create`.

```ruby
  def create
    @friend = Friend.new(friend_params)

    if current_user.requests.where('pending = true').include?(User.find_by_id(friend_params[:user_two_id]))
      @friend.pending = false
      Friend.update({
        user_two_id: friend_params[:user_one_id].to_i,
        user_one_id: friend_params[:user_two_id].to_i,
        })
    end

    if @friend.save
      render json: current_user.find_friends
    else
      render json: @friend.errors.full_messages, status: 422
    end
  end
```


 A user can only create bills with friends for whom `pending` is false. When a client wants to create a bill they are prompted to type in the friends name, like in the new friend search the client is prompted with friends that match what they have typed. When the client find the friend they would like to create a bill with they can click on their name, prompting the `NewBillForm` to pop up.

 ![BillSearch]

 ![newBill]

  Should a user decide to change the friend they are splitting a bill with, the form will disappear. In the `NewBillForm` a client can choose the percentage split between themselves and their friend. On submit the percentage is changed to the `owed` amount stored in the database.


###


##Future Directions for the Project

  The next steps for Splitbys are discussed below.

###Group Split
 One of the best most usefull parts of splitbys is their group split possibility. I would like to implement add multiple friends to a bill and configuring each friend's percentage of the split.


###Checkout
Currently one can settle up with their friends by adding a bill of equal value to that shown on the totals page. I think it would be fun to implement a settle up function that shows differently on the user's transactions history. To do so I will implement a `SettleComponent` that appears on a friend's transaction page, and a boolean `settle` for the bills table in the database.  



[sums]: ./docs/wireframes/sums.png
[smallSum]: ./docs/wireframes/smallSum.png
[BillSearch]: ./docs/wireframes/BillSearch.png
[newBill]: ./docs/wireframes/newBill.png
[BillDetail]: ./docs/wireframes/BillDetail.png
[CommentsCrop]: ./docs/wireframes/CommentsCrop.png
[friendIndex]: ./docs/wireframes/friendIndex.png
[FriendSearch]: ./docs/wireframes/FriendSearch.png
[FriendSearchDropdown]: ./docs/wireframes/FriendSearchDropDown.png

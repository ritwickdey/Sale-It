# Sale It

A Sample Vehicle Dealer App built with ASP.NET Core + Angular 4

## Features 
- Only Admin/Moderator can perform Create/Edit/Delete operator & upload photo.
- Normal User Can Only view the vehicle details & report of vehicles in charts view.
- Server Side Sorting & Pagination
- Role Based Athentication

## Demo Link :
 Live Demo: https://ritwick-sale-it.azurewebsites.net/

## Framework / Library / Service Used
- Angular 4 *(Frontend)*
- ASP.NET Core *(Backend)*
- Entity Framework Core *(ORM)*
- Auth0 *(Athentication & Authorization)*
- AutoMapper *(For mapping into Domain Model & DTO)*
- Chart.js *(For Pie Chart)*

## To run the project:
```
    > git clone https://github.com/ritwickdey/Sale-It.git
    > cd Sale-It/
    > npm install
    > dotnet restore
    > set ASPNETCORE_ENVIRONMENT=Development
    > set connectionString:Default="<YOUR CONNETION STRING>"
    > npm i webpack -g
    > webpack --config webpack.config.vendor.js
    > webpack 
    > dotnet ef database update
    > dotnet watch run 
```


> [The project is improved from this awesome [Angular + ASP.NET Core course](https://www.udemy.com/aspnet-core-angular/) (BY MOSH HAMEDANI) which I've taken.]
# Project review and feedback

This is project feedback

## Things that don't work

Nothing here

## Things that should be added

1. Error handling for API requests, especially authenticating, things like when the password is too short.
2. Frontend form validation
3. Validate the project deadline is not in the past

## Things that should be removed

Nothing here

## Things that should be improved

1. Fields that should be selectable instead of typing:

    Rule of thumb is try remove as much typing as possible

    - Technologies
    - Social accounts
    - Timezone
    - Language

    For languages we should just compile a list of the most popular ones

    For social accounts also a list of the main ones

    Same thing for technologies

    For timezone we can just list all of them. There should be a public list available

2. For the userprofile, you cannot edit a SerializerMethodField. Hence why the user and freelancer data do not show up in the validated serializer data. I believe the best way to solve this is to override the put method on the ProfileView and use a different serializer to handle all that data. Probably a model serializer for the Profile model that specifies all the freelancer fields manually like explained [in this answer](https://stackoverflow.com/questions/40555472/django-rest-serializer-method-writable-field)

Above that though, I don't think we should allow updating the username and email in that same form. The username in this case isn't really useful for the end user. Even for freelancers we would rather show their full name instead of their username. So I would remove username and email from that form and put it in a separate part of the users settings for them to only update their email. In that view that updates their email, we would still need to check if that email is already in use.

3. A small thing for this kind of project but I think it would probably be better to make the user login via their email. You can specify this in the settings file using django-allauth settings.
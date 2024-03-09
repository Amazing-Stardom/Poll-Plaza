
import json
from django.http import HttpResponseRedirect
from django.template import loader
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.http import JsonResponse
from .models import Choice, Question,Tag
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect
from django.views import generic
from django.utils import timezone
class IndexView(generic.ListView):
    template_name = "polls/index.html"
    context_object_name = "latest_question_list"
    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by("-pub_date")[:5]
class DetailView(generic.DetailView):
    model = Question
    template_name = "polls/detail.html"
    def get_queryset(self):
        """
        Excludes any questions that aren't published yet.
        """
        return Question.objects.filter(pub_date__lte=timezone.now())


class ResultsView(generic.DetailView):
    model = Question
    template_name = "polls/results.html"

def get_queryset(self):
    """
    Return the last five published questions (not including those set to be
    published in the future).
    """
    return Question.objects.filter(pub_date__lte=timezone.now()).order_by("-pub_date")[
        :5
    ]
# def vote(request, question_id):
#     question = get_object_or_404(Question, pk=question_id)
#     try:
#         selected_choice = question.choice_set.get(pk=request.POST["choice"])
#     except (KeyError, Choice.DoesNotExist):
#         return render(
#             request,
#             "polls/detail.html",
#             {
#                 "question": question,
#                 "error_message": "You didn't select a choice.",
#             },
#         )
#     else:
#         selected_choice.votes += 1
#         selected_choice.save()
#         return HttpResponseRedirect(reverse("polls:results", args=(question.id,)))
# def detail(request, question_id):
#     question = get_object_or_404(Question, pk=question_id)
#     print(question.choice_set.all)
#     return render(request, "polls/detail.html", {"question": question})
def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    context = {"latest_question_list": latest_question_list}
    return render(request, "polls/index.html", context)
def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, "polls/results.html", {"question": question})
from .models import Tag  # Make sure to import the Tag model

@csrf_exempt
def create_poll(request):
    if request.method == 'POST':
        try:
            json_data = json.loads(request.body)
            question_text = json_data.get('Question')
            option_votes = json_data.get('OptionVote', {})
            tags = json_data.get('Tags', [])
            
            # Create the question object
            pub_date = timezone.now()
            question = Question.objects.create(
                question_text=question_text,
                pub_date=pub_date
            )
            
            # Create choice objects for each option vote
            for option, votes in option_votes.items():
                choice = Choice.objects.create(
                    question=question,
                    choice_text=option,
                    votes=votes
                )
            
            # Create tag objects for each tag
            for tag_name in tags:  # Iterate over tag names
                tag = Tag.objects.create(  # Use the Tag model to create tag objects
                    question=question,
                    tag = tag_name  # Pass the tag name as a parameter
                )

            return JsonResponse({'Data': 'Loaded'})
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def fetch_polls(request):
    try:
        q_data = Question.objects.all()
        formatted_data = []
        for question in q_data:
            question_dict = {
                "Question": question.question_text,
                "OptionVote": {},
                "Tags": [],
                "id":question.id
            }
            choices = question.choice_set.all()
            for choice in choices:
                question_dict["OptionVote"][choice.choice_text] = choice.votes
            tags = question.tag_set.all()
            for tag in tags:
                question_dict["Tags"].append(tag.tag)
            formatted_data.append(question_dict)
        return JsonResponse(formatted_data, safe=False)
    except Exception as e:
            print(e)
            return JsonResponse({'error': 'Tags not found'}, status=404)
def filter_tag(request):
    tags = request.GET.get('tags')
    tag_list = tags.split(',') if tags else []
    if tag_list:
        questions = Question.objects.filter(tag__tag__in=tag_list).distinct()
    else:
        questions = Question.objects.all()
    formatted_data = []
    for question in questions:# Check if any tag from tag_list is present in the tag_set of the question
        for tag in tag_list:
            if tag in question.tag_set.values_list('tag', flat=True):# This block is executed when any tag from tag_list is found in the question's tags
                question_dict = {
                    "Question": question.question_text,
                    "OptionVote": {},
                    "Tags": [],
                    "id":question.id  # You can update this part as needed
                }# Add choices to the OptionVote dictionary
                choices = question.choice_set.all()
                for choice in choices:
                    question_dict["OptionVote"][choice.choice_text] = choice.votes# Add tags to the Tags list
                tags = question.tag_set.values_list('tag', flat=True)
                question_dict["Tags"] = list(tags)# Append the formatted question dictionary to the list
                formatted_data.append(question_dict)# Exit the loop once a matching tag is found
                break
    return JsonResponse(formatted_data, safe=False)

@csrf_exempt
def update_poll_option(request, pk):

    if request.method == 'PUT':
        payload = json.loads(request.body)
        increment_option = payload.get('incrementOption')
        try:
            
            poll = Question.objects.get(pk=pk)
            choice = Choice.objects.get(question=poll, choice_text=increment_option)
            choice.votes += 1
            choice.save()
            return JsonResponse({'message': 'Option incremented successfully'}, status=200)
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Question or choice does not exist'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

def fetch_poll(request, pk):
    if request.method == 'GET':
        try:
            question = Question.objects.get(pk=pk)
            formatted_data = {
                "Question": question.question_text,
                "OptionVote": {},
                "Tags": [],
                "id":question.id
            }
            choices = question.choice_set.all()
            for choice in choices:
                formatted_data["OptionVote"][choice.choice_text] = choice.votes
            tags = question.tag_set.all()
            for tag in tags:
                formatted_data["Tags"].append(tag.tag)
            return JsonResponse([formatted_data], safe=False)
        except Question.DoesNotExist:
            return JsonResponse({'error': 'Question not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

def fetch_tags(request):
    if request.method == 'GET':
        try:
            tags = list(set(Tag.objects.values_list('tag', flat=True))) # Extract tags from the queryset
            return JsonResponse({'Tags': tags})  # Return the tags as JSON
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Tags not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# "tag1",
# "tag2",
# "tag3"
# ]
# }

# {
# "Question": "question_text",
# "OptionVote":{
# "Option1": "vote1",
# "Option2": "vote2",
# "Option3": "vote3"
# },
# "Tags": ["tag1", "tag2"]
# }
# def update_poll_option(request, pk):
#     # Retrieve the poll object
#     poll = get_object_or_404(Question, pk=pk)
    
#     if request.method == 'PUT':
#         # Logic to update the poll object based on the data sent in the request
#         # For demonstration purposes, let's assume the data is sent as JSON in the request body
#         # You would typically use serializers or other methods to handle data validation and update
        
#         # Example logic to update the poll object based on the JSON data
#         # Assuming the JSON data contains fields to update the poll, e.g., 'question', 'options'
#         data = request.POST  # Assuming JSON data is sent in the body of the request
#         poll.question = data.get('question', poll.question)
#         poll.save()
        
#         # You can return any response indicating the successful update
#         return JsonResponse({'message': 'Poll updated successfully'})
    
    # # Handle other HTTP methods if needed
    
    # # Return the poll details if the request method is not PUT
    # return JsonResponse({'id': poll.id, 'question': poll.question, 'options': poll.options})



# def update_poll_option(request, pk):
#     print(request)
#     print(pk)
#     if request.method == 'PUT':
#         payload = json.loads(request.body)
#         increment_option = payload.get('incrementOption')
#         try:
#             poll = Question.objects.get(pk=pk)
#             choice = Choice.objects.get(question=poll, choice_text=increment_option)
#             choice.votes += 1
#             choice.save()
#             return JsonResponse({'message': 'Option incremented successfully'}, status=200)
#         except (Question.DoesNotExist, Choice.DoesNotExist):
#             return JsonResponse({'error': 'Question or choice does not exist'}, status=404)
#     else:
#         return JsonResponse({'error': 'Method not allowed'}, status=405)
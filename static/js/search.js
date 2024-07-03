{% extends "base.html" %}
{% load static %}
{% load crispy_forms_tags %}

{% block title %}Search Results{% endblock %}

{% block extra_css %}
<link rel="stylesheet" href="{% static 'css/kanban.css' %}">
{% endblock %}

{% block content %}
<h2>Search Results</h2>
{% if tasks %}
    <ul class="list-group">
        {% for task in tasks %}
            <li class="list-group-item">
                <div class="kanban-task" data-task-id="{{ task.id }}">
                    <div class="kanban-task-title">
                        <span class="priority-indicator 
                            {% if task.priority == 'Low' %}priority-low
                            {% elif task.priority == 'Medium' %}priority-medium
                            {% elif task.priority == 'High' %}priority-high
                            {% endif %}
                        "></span>
                        {{ task.title }}
                    </div>
                    <div class="kanban-task-due">{{ task.due_date }}</div>
                    <div class="kanban-task-details" style="display: none;">
                        <p>{{ task.description }}</p>
                        <button class="btn btn-primary edit-task-btn">Edit</button>
                        <button class="btn btn-danger delete-task-btn">Delete</button>
                        <button class="btn btn-secondary close-task-btn">Close</button>
                    </div>
                </div>
            </li>
        {% endfor %}
    </ul>
{% else %}
    <p>No tasks found matching your query.</p>
{% endif %}

<!-- Task Modal -->
<div id="task-modal" class="modal">
    <div class="modal-content">
        <span class="close-btn">&times;</span>
        <form id="task-form" method="post" action="{% url 'kanban:create_task' %}">
            {% csrf_token %}
            {{ task_form|crispy }}
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    </div>
</div>
{% endblock %}

{% block extra_js %}
<script src="{% static 'js/search.js' %}"></script>
{% endblock %}


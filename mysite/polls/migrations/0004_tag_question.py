# Generated by Django 5.0.1 on 2024-02-11 15:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0003_alter_question_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='question',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='polls.question'),
        ),
    ]
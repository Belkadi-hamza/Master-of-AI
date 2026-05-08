from Student import Student
from Person import Person

s1 = Student("Hamza", 1999, 'Male', ['py','java','php'])
s2 = Student.initFromAge("Sara", 22, 'Female')

print(s1+s2)
print(s1 < s2)
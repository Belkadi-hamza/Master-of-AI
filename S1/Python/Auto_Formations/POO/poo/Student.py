from Person import Person
class Student(Person):
    # Class Variable
    nbr_of_students = 0
    # Constructor
    def __init__(self, name, yearOfBirth, gender, courses = []):
        super().__init__(name, yearOfBirth, gender)
        self.__cources = self.list_courses(courses)
        Student.nbr_of_students += 1
        self.__id = Student.nbr_of_students

    # Getters
    def getCourses(self):
        return self.__cources
    def getId(self):
        return self.__id
    
    # Setters
    def setCourses(self,newCourses):
        if type(newCourses) != list:
            self.__cources.append(newCourses)
        else:
            self.__cources.extend(newCourses)

    def list_courses(self,courses):
        list_courses = []
        if type(courses) != list:
            list_courses = [courses]
        else:
            list_courses = courses
        return list_courses
    
    def info(cls):
        return f"This is a student class inheriting from Person class." 
    # dunder method
    def __str__(self):
        str = super().__str__()
        return f"{str} And my student ID is {self.__id}."
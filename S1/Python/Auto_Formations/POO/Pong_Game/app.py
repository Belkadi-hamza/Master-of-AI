import turtle

# Set up the screen
wind = turtle.Screen()
wind.title("Pong")
wind.bgcolor("black")
wind.setup(width=800, height=400)
wind.tracer(0)

# paddle 1
paddle1 = turtle.Turtle()
paddle1.speed(0)
paddle1.shape("square")
paddle1.color("blue")
paddle1.shapesize(stretch_wid=5, stretch_len=1)
paddle1.penup()
paddle1.goto(-380, 0)

# paddle 2
paddle2 = turtle.Turtle()
paddle2.speed(0)
paddle2.shape("square")
paddle2.color("red")
paddle2.shapesize(stretch_wid=5, stretch_len=1)
paddle2.penup()
paddle2.goto(380, 0)
# ball
ball = turtle.Turtle()
ball.speed(0)
ball.shape("square")
ball.color("white")
ball.penup()
ball.goto(0, 0)
ball.dx = 0.2
ball.dy = -0.2
# function to move paddles
def paddle1_up():
    y = paddle1.ycor()
    y += 30
    paddle1.sety(y)
def paddle1_down():
    y = paddle1.ycor()
    y -= 30
    paddle1.sety(y)
def paddle2_up():
    y = paddle2.ycor()
    y += 30
    paddle2.sety(y)
def paddle2_down():
    y = paddle2.ycor()
    y -= 30
    paddle2.sety(y)
# keyboard bindings
wind.listen()
wind.onkeypress(paddle1_up, "w")
wind.onkeypress(paddle1_down, "s")
wind.onkeypress(paddle2_up, "Up")
wind.onkeypress(paddle2_down, "Down")
# main game loop
while True:
    wind.update()
    ball.setx(ball.xcor() + ball.dx)
    ball.sety(ball.ycor() + ball.dy)
    # border checking
    if ball.ycor() > 190:
        ball.sety(190)
        ball.dy *= -1
    if ball.ycor() < -190:
        ball.sety(-190)
        ball.dy *= -1
    if ball.xcor() > 390:
        ball.goto(0, 0)
        ball.dx *= -1
    if ball.xcor() < -390:
        ball.goto(0, 0)
        ball.dx *= -1
    # paddle and ball collisions
    if (ball.xcor() > 360 and ball.xcor() < 370) and (ball.ycor() < paddle2.ycor() + 50 and ball.ycor() > paddle2.ycor() - 50):
        ball.setx(360)
        ball.dx *= -1
    if (ball.xcor() < -360 and ball.xcor() > -370) and (ball.ycor() < paddle1.ycor() + 50 and ball.ycor() > paddle1.ycor() - 50):
        ball.setx(-360)
        ball.dx *= -1
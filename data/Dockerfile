FROM golang:1.17.12

WORKDIR /build
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
RUN go build -o main .
WORKDIR /dist
RUN cp /build/main .
CMD ["/dist/main"]
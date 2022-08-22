---
title: JPA - 트랜잭션과 락
date: 2020-10-17 20:10:66
category: java
draft: false
---

트랜잭션 기초와 JPA 가 제공하는 낙관적 락과 비관적 락에 대해 알아보자.

## 트랜잭션과 격리 수준

트랜잭션은 ACID라 하는 원자성(Atomicity), 일관성(Consistency), 격리성(Isolation), 지속성(Durability)을 보장해야한다.

- 원자성(Atomicity): 트랜잭션 내에서 실행한 작업들은 마치 하나의 작업인 것처럼 모두 성공하든가 모두 실패해야 한다.
- 일관성(Consistency): 모든 트랜잭션은 일관성 있는 데이터베이스 상태를 유지해야 한다.
- 격리성(Isolation): 동시에 실행되는 트랜잭션들이 서로에게 영향을 미치지 않도록 격리한다. 예를 들어 동시에 같은 데이터를 수정하지 못하도록 해야 한다. 격리성은 동시성과 관련된 성능 이슈로 인해 격리 수준을 선택할 수 있다.
- 지속성(Durability): 트랜잭션을 성공적으로 끝내면 그 결과가 항상 기록되야 한다. 중간에 시스템에 문제가 발생해도 데이터베이스 로그 등을 사용해서 성공한 트랜잭션 내용을 복구해야 한다.

트랜잭션은 원자성, 일관성, 지속성을 보장한다. 문제는 격리성인데 트랜잭션 간에 격리성을 완전히 보장하려면 트랜잭션을 거의 차례대로 실행해야 한다. 이렇게 하면 동시성 처리 성능이 매우 나빠진다. 이런 문제로 인해 ANSI 표준은 트랜잭션의 격리 수준을 4단계로 나누어 정리했다.

트랜잭션 격리 수준(Isolation level)은 다음과 같다.

- READ UNCOMMITED (커밋되지 않은 읽기)
- READ COMMITED (커밋된 읽기)
- REPEATABLE READ (반복 가능한 일기)
- SERIALIZABLE

순서대로 READ UNCOMMITED 의 격리 수준이 가장 낮고 SERIALIZABLE 의 격리 수준이 가장 높다. 격리 수준이 낮을수록 동시성은 증가하지만 격리 수준에 따른 다양한 문제가 발생한다.

## References

[자바 ORM 표준 JPA 프로그래밍](https://www.aladin.co.kr/shop/wproduct.aspx?itemid=62681446)

﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Teste.Impl.Context;

namespace Teste.Impl.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20180826234224_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.2-rtm-30932")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Teste.Domain.Entities.Crediario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("EnableCrediario")
                        .HasColumnName("ENABLE_CREDIARIO");

                    b.Property<int>("PersonId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.HasIndex("UserId");

                    b.ToTable("CREDIARIO");
                });

            modelBuilder.Entity("Teste.Domain.Entities.Gender", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnName("NAME")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("GENDER");
                });

            modelBuilder.Entity("Teste.Domain.Entities.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("BirthDate");

                    b.Property<string>("Cpf")
                        .IsRequired()
                        .HasColumnName("CPF")
                        .HasMaxLength(11);

                    b.Property<int>("GenderId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnName("NOME")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.HasIndex("GenderId");

                    b.ToTable("PERSON");
                });

            modelBuilder.Entity("Teste.Domain.Entities.Sale", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CreadiarioId")
                        .HasColumnName("CREDIARIO_ID");

                    b.Property<bool>("EnableSale")
                        .HasColumnName("ENABLE_SALE");

                    b.Property<DateTime>("PurchaseDate")
                        .HasColumnName("PURCHASE_DATE")
                        .HasColumnType("datetime2");

                    b.Property<double>("Value")
                        .HasColumnName("Value");

                    b.HasKey("Id");

                    b.HasIndex("CreadiarioId");

                    b.ToTable("SALE");
                });

            modelBuilder.Entity("Teste.Domain.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnName("NAME")
                        .HasMaxLength(20);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnName("PASSWORD")
                        .HasMaxLength(20);

                    b.HasKey("Id");

                    b.ToTable("USER");
                });

            modelBuilder.Entity("Teste.Domain.Entities.Crediario", b =>
                {
                    b.HasOne("Teste.Domain.Entities.Person", "Person")
                        .WithMany()
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Teste.Domain.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("Teste.Domain.Entities.Person", b =>
                {
                    b.HasOne("Teste.Domain.Entities.Gender", "Gender")
                        .WithMany()
                        .HasForeignKey("GenderId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("Teste.Domain.Entities.Sale", b =>
                {
                    b.HasOne("Teste.Domain.Entities.Crediario", "Crediario")
                        .WithMany("Sales")
                        .HasForeignKey("CreadiarioId")
                        .HasConstraintName("FK_SALE_CREDIARIO_CREDIARIO_ID");
                });
#pragma warning restore 612, 618
        }
    }
}
